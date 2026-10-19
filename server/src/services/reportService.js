import pool from "../db/pool.js";

function createHttpError(message, status = 400) {
    const error = new Error(message);
    error.status = status;
    return error;
}

function parseDate(value, fieldName) {
    if (value === undefined || value === "") {
        return undefined;
    }

    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw createHttpError(`${fieldName} must use the YYYY-MM-DD format.`);
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        throw createHttpError(`${fieldName} must be a valid calendar date.`);
    }

    return value;
}

function getDateRange(query) {
    const startDate = parseDate(query.start_date, "start_date");
    const endDate = parseDate(query.end_date, "end_date");

    if (startDate && endDate && startDate > endDate) {
        throw createHttpError("start_date cannot be later than end_date.");
    }

    return { startDate, endDate };
}

function addPaymentDateFilters(conditions, values, startDate, endDate) {
    if (startDate) {
        values.push(startDate);
        conditions.push(`p.payment_date >= $${values.length}::date`);
    }

    if (endDate) {
        values.push(endDate);
        conditions.push(`p.payment_date <= $${values.length}::date`);
    }
}

export async function getIncomeReport(query) {
    const { startDate, endDate } = getDateRange(query);
    const conditions = [];
    const values = [];
    addPaymentDateFilters(conditions, values, startDate, endDate);
    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const [summaryResult, methodResult] = await Promise.all([
        pool.query(
            `SELECT
                COALESCE(SUM(p.amount), 0) AS total_income,
                COUNT(*)::int AS payment_count,
                COALESCE(AVG(p.amount), 0) AS average_payment_amount
            FROM payments p
            ${whereClause}`,
            values
        ),
        pool.query(
            `SELECT
                p.payment_method,
                COALESCE(SUM(p.amount), 0) AS total_income,
                COUNT(*)::int AS payment_count
            FROM payments p
            ${whereClause}
            GROUP BY p.payment_method
            ORDER BY p.payment_method`,
            values
        )
    ]);

    const summary = summaryResult.rows[0];
    return {
        date_range: { start_date: startDate ?? null, end_date: endDate ?? null },
        total_income: Number(summary.total_income),
        payment_count: summary.payment_count,
        average_payment_amount: Number(summary.average_payment_amount),
        by_payment_method: methodResult.rows.map((row) => ({
            payment_method: row.payment_method,
            total_income: Number(row.total_income),
            payment_count: row.payment_count
        }))
    };
}

export async function getPaymentReport(query) {
    const { startDate, endDate } = getDateRange(query);
    const { payment_method, plan_id, search } = query;

    if (payment_method !== undefined && (typeof payment_method !== "string" || !payment_method.trim())) {
        throw createHttpError("payment_method must be a non-empty string.");
    }

    let planId;
    if (plan_id !== undefined && plan_id !== "") {
        planId = Number(plan_id);
        if (!Number.isInteger(planId) || planId <= 0) {
            throw createHttpError("plan_id must be a positive integer.");
        }
    }

    if (search !== undefined && (typeof search !== "string" || !search.trim())) {
        throw createHttpError("search must be a non-empty string.");
    }

    const conditions = [];
    const values = [];
    addPaymentDateFilters(conditions, values, startDate, endDate);

    if (payment_method?.trim()) {
        values.push(payment_method.trim());
        conditions.push(`p.payment_method ILIKE $${values.length}`);
    }

    if (planId) {
        values.push(planId);
        conditions.push(`ms.plan_id = $${values.length}`);
    }

    if (search?.trim()) {
        values.push(`%${search.trim()}%`);
        conditions.push(`(
            CONCAT(m.first_name, ' ', m.last_name) ILIKE $${values.length}
            OR m.phone ILIKE $${values.length}
            OR CAST(p.payment_id AS TEXT) ILIKE $${values.length}
        )`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const result = await pool.query(
        `SELECT
            p.payment_id,
            p.member_id,
            p.membership_id,
            CONCAT(m.first_name, ' ', m.last_name) AS member_name,
            mp.plan_id,
            mp.plan_name,
            p.amount,
            TO_CHAR(p.payment_date, 'YYYY-MM-DD') AS payment_date,
            p.payment_method
        FROM payments p
        JOIN members m ON m.member_id = p.member_id
        JOIN memberships ms ON ms.membership_id = p.membership_id
        JOIN membership_plans mp ON mp.plan_id = ms.plan_id
        ${whereClause}
        ORDER BY p.payment_date DESC, p.payment_id DESC`,
        values
    );

    return {
        date_range: { start_date: startDate ?? null, end_date: endDate ?? null },
        payments: result.rows.map((row) => ({ ...row, amount: Number(row.amount) }))
    };
}

export async function getMembershipReport() {
    const result = await pool.query(
        `SELECT
            COUNT(*) FILTER (WHERE expiration_date < CURRENT_DATE)::int AS expired_count,
            COUNT(*) FILTER (
                WHERE expiration_date >= CURRENT_DATE
                AND expiration_date <= CURRENT_DATE + INTERVAL '7 days'
            )::int AS expiring_soon_count,
            COUNT(*) FILTER (
                WHERE expiration_date > CURRENT_DATE + INTERVAL '7 days'
            )::int AS active_count,
            COUNT(*)::int AS total_count
        FROM memberships`
    );

    return result.rows[0];
}

export async function getMemberReport() {
    const result = await pool.query(
        `SELECT
            COUNT(*) FILTER (WHERE LOWER(status) = 'active')::int AS active_count,
            COUNT(*) FILTER (
                WHERE LOWER(status) IN ('deactive', 'deactivated')
            )::int AS deactivated_count,
            COUNT(*) FILTER (
                WHERE LOWER(status) NOT IN ('active', 'deactive', 'deactivated')
            )::int AS other_status_count,
            COUNT(*)::int AS total_count
        FROM members`
    );

    return result.rows[0];
}
