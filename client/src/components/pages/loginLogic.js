export const initialLoginForm = { email: "", password: "", remember: false };

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export async function loginRequest(form) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        remember: form.remember,
      }),
    });

    const data = await response.json();

    return {
      ok: response.ok,
      ...data,
    };
  } catch {
    return {
      ok: false,
      message: "Unable to connect to the server.",
    };
  }
}
