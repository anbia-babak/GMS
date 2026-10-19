import pool from "../db/pool.js";

function createHttpError(message, status = 400) {
    const error = new Error(message);
    error.status = status;
    return error;
}

const allowedFields = ["gym_name", "phone", "email", "address"];

function normalizeOptionalText(value, fieldName, maxLength) {
    if (value === null) {
        return null;
    }

    if (typeof value !== "string") {
        throw createHttpError(`${fieldName} must be a string or null.`);
    }

    const normalized = value.trim();
    if (!normalized || normalized.length > maxLength) {
        throw createHttpError(`${fieldName} must contain between 1 and ${maxLength} characters.`);
    }

    return normalized;
}

function normalizeSettingsUpdate(settingsData) {
    if (!settingsData || Array.isArray(settingsData) || typeof settingsData !== "object") {
        throw createHttpError("Request body must be a JSON object.");
    }

    const fields = Object.keys(settingsData);
    if (fields.length === 0) {
        throw createHttpError("Provide at least one settings field to update.");
    }

    const unsupportedField = fields.find((field) => !allowedFields.includes(field));
    if (unsupportedField) {
        throw createHttpError(`Unsupported settings field: ${unsupportedField}.`);
    }

    const normalized = {};
    for (const field of fields) {
        const value = settingsData[field];

        if (field === "gym_name") {
            if (value === null) {
                throw createHttpError("gym_name cannot be null.");
            }
            normalized[field] = normalizeOptionalText(value, field, 150);
        }

        if (field === "phone") {
            const phone = normalizeOptionalText(value, field, 30);
            if (phone !== null && !/^[0-9+().\-\s]+$/.test(phone)) {
                throw createHttpError("phone contains invalid characters.");
            }
            normalized[field] = phone;
        }

        if (field === "email") {
            const email = normalizeOptionalText(value, field, 250);
            if (email !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw createHttpError("email must be a valid email address.");
            }
            normalized[field] = email;
        }

        if (field === "address") {
            normalized[field] = normalizeOptionalText(value, field, 250);
        }
    }

    return normalized;
}

const settingsSelection = `
    sttings_id AS settings_id,
    gym_name,
    phone,
    email,
    address`;

export async function getSettings() {
    const result = await pool.query(
        `SELECT ${settingsSelection}
        FROM gym_settings
        ORDER BY sttings_id
        LIMIT 1`
    );

    if (result.rows.length === 0) {
        throw createHttpError("Gym settings have not been configured.", 404);
    }

    return result.rows[0];
}

export async function updateSettings(settingsData) {
    const normalizedData = normalizeSettingsUpdate(settingsData);
    const fields = Object.keys(normalizedData);
    const values = fields.map((field) => normalizedData[field]);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");

    const result = await pool.query(
        `UPDATE gym_settings
        SET ${setClause}
        WHERE sttings_id = (
            SELECT sttings_id
            FROM gym_settings
            ORDER BY sttings_id
            LIMIT 1
        )
        RETURNING ${settingsSelection}`,
        values
    );

    if (result.rows.length === 0) {
        throw createHttpError("Gym settings have not been configured.", 404);
    }

    return result.rows[0];
}
