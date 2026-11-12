import pool from "../db/pool.js";
import bcrypt from "bcryptjs";

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const result = await pool.query(
      "SELECT user_id, username, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    await new Promise((resolve, reject) => {
        req.session.regenerate((error) => {
            if (error) reject(error);
            else resolve();
        });
        });

    req.session.userId = user.user_id;

    if (req.body.remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    }

    await new Promise((resolve, reject) => {
        req.session.save((error) => {
            if (error) reject(error);
            else resolve();
        });
    });

    return res.status(200).json({
      message: "Login successful.",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error during login.",
    });
  }
};

// Check current session
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Not authenticated.",
      });
    }

    const result = await pool.query(
      "SELECT user_id, username, email FROM users WHERE user_id = $1",
      [req.session.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Session check error:", error);
    return res.status(500).json({
      message: "Server error checking session.",
    });
  }
};

// Logout
export const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error);
      return res.status(500).json({
        message: "Could not log out.",
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Logout successful.",
    });
  });
};