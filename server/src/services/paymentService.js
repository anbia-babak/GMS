import pool from "../db/pool.js";

export async function addPayment(paymentData) {

    const {member_id, membership_id, amount, payment_date, payment_method} = paymentData;
    const parsedAmount = Number(amount);
    if(!Number.isFinite(parsedAmount) || parsedAmount <= 0){
        const error = new Error("Amount must be greater than zero.");
        error.status = 400;
        throw error;
    }

    if(!payment_date){
        const error = new Error("Payment date is required.");
        error.status = 400;
        throw error;
    }
    // Verifying that the membership belongs to this member.:
    const resultMembership = await pool.query(
        `SELECT membership_id
        FROM memberships
        WHERE membership_id = $1
            AND member_id = $2`,
            [membership_id, member_id]
    );
    if(resultMembership.rows.length === 0){
        const error = new Error("Membership not found or does not belong to this member.");
        error.status = 400;
        throw error;
    }
    const membershipId = resultMembership.rows[0].membership_id;

    const result = await pool.query(
        `INSERT INTO payments (member_id, membership_id, amount, payment_date, payment_method)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING 
        payment_id,member_id,membership_id,amount,
        TO_CHAR(payment_date, 'YYYY-MM-DD') AS payment_date,
        payment_method`,
        // we use TO_CHAR(payment_date, 'YYYY-MM-DD') because the date which is stored in DB
        // also stores timezones and timestamps , which we don't want.!
        [member_id, membershipId, parsedAmount, payment_date, payment_method]
    );

    return result.rows;
};


export async function getAllPayments(search, status, plan_id) {
    
    // We Join the members, memberships, and membership_plans tables to show them in one single table
    // we use INNER JOIN to MERGE them together and 
    // we USE (CASE WHEN) to caluculate and display the status on the table
    // Instead of calculating them explicitly !



    let query = `SELECT
            p.payment_id,
            CONCAT(m.first_name, ' ', m.last_name) AS member_name,
            mp.plan_name,
            p.amount,
            p.payment_date,
            p.payment_method,

            CASE
                WHEN ms.expiration_date < CURRENT_DATE
                    THEN 'Expired'
                WHEN ms.expiration_date <= CURRENT_DATE + INTERVAL '7 days'
                    THEN 'Expiring Soon'
                ELSE 'Active'
            END AS status        

            FROM payments p
            JOIN members m
                ON m.member_id = p.member_id
            JOIN memberships ms
                ON ms.membership_id = p.membership_id    
            JOIN membership_plans mp 
                ON mp.plan_id = ms.plan_id `


    const conditions = [];
    // conditions stores All the SQL filtering rules that user actually selected.!
    const values = [];


    // we use these if statements to decide :
    // Which filters should be included in this particular SQL query.

    // we use values.length to keep parameters numbers correct.!
    if(plan_id){
        values.push(plan_id);

        conditions.push(`ms.plan_id = $${values.length}`);
    };


    if(status === "Expired"){
        conditions.push(
            `ms.expiration_date < CURRENT_DATE`
        );
    }
    if(status === "Expiring Soon"){
        conditions.push(
            `ms.expiration_date >= CURRENT_DATE
            AND ms.expiration_date <= CURRENT_DATE + INTERAL '7 days'`
        );
    }
    if(status === "Active"){
        conditions.push(
            `ms.expiration_date > CURRENT_DATE + INTERVAL '7 days'`
        );
    }


    if(search){
        // this is the SQL's search pattern (%name%)! 
        values.push(`%${search}%`);

        conditions.push(
            `(
                CONCAT(m.first_name, ' ' , m.last_name) ILIKE $${values.length}
                OR m.phone ILIKE $${values.length}
                OR CAST(p.payment_id AS TEXT) ILIKE $${values.length}
            )`
        );
    }
    // conditions.length > 0 checks if user selected any filters (WHERE clause) : 
    if (conditions.length > 0) {
        // we use JION("AND") to add ADD between SQL Quries:
        // status condition , search condition, ms.plan_id = $2
        // => to : status condition AND search condition AND ms.plan_id = $2 TO MAKE IT A CORRCET QUERY! 
        // (combines all filter conditions with AND to create the WHERE clause.)
        query += `WHERE ${conditions.join(" AND ")}`;
    };
    query += ` ORDER BY p.payment_id`;
    // add SORTING to the final SQL query.
    const result = await pool.query(query,values);
    return result.rows

};


export async function getSpecificPaymentDetails(paymentId) {
    
    const result = await pool.query(
        `SELECT 
        p.payment_id,
        CONCAT(m.first_name, ' ', m.last_name) AS member_name,
        m.phone,
        ms.membership_id,
        mp.plan_name,
        p.amount,
        TO_CHAR(p.payment_date, 'YYYY-MM-DD') AS payment_date,
        p.payment_method
        FROM payments p
        JOIN members m
        ON p.member_id = m.member_id
        JOIN memberships ms
        ON p.membership_id = ms.membership_id
        JOIN membership_plans mp
        ON ms.plan_id = mp.plan_id
        WHERE payment_id = $1`,
        [paymentId]
    );

    if(result.rows.length === 0){
        const error = new Error("Payment not found.")
        error.status = 404;
        throw error;
    }
    return result.rows[0];
};


export async function editSpecificPayment(paymentId, newData) {
    
    // The fields which the owner changes must include only these fields:
    const allowedChangeFields = ["amount", "payment_date", "payment_method", "membership_id"];

    // Finiding which data inputs match with the allowedChangeFields list :
    // We use Object.keys() to get ONLY the keys of the newData object?
    const fields = Object.keys(newData).filter((field)=> allowedChangeFields.includes(field));

    // Rejecting an empty update ,or (what if nothing is being sent over the form):
    if (fields.length === 0){
        const error = new Error("No valid fields provided for update.");
        error.status = 400;
        throw error;
    };

    // Validate the payment amount.
    // isFinite() checks whether the number is finite or infinite.
    // alse rejects strings.
    if(newData.amount !== undefined){
        const amount = Number(newData.amount);
        if(!Number.isFinite(amount) || amount <= 0){
            const error = new Error("Payment amount must be a valid positive number.");
            error.status = 400;
            throw error;
        }
        newData.amount = amount;
    };

    // Validate the payment date:
    if(newData.payment_date !== undefined){
        const date = newData.payment_date;
        
        // Check the required YYYY-MM-DD format:
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if(!datePattern.test(date)){
            const error = new Error("Payment date must use the YYYY-MM-DD format.");
            error.status = 400;
            throw error;
        }

        // Check whther the date actually exists on the calender:
        const [year, month, day] = date.split("-").map(Number);

        const parsedDate = new Date(Date.UTC(year, month-1, day));
        const isValidDate = 
        parsedDate.getUTCFullYear() === year &&
        parsedDate.getUTCMonth() === month-1 &&
        parsedDate.getUTCDay() === day;
        // This checks both the format and the actual calender date. exp:2026-10-14 -> accepted   2026-02-30 -> rejected
        if(!isValidDate){
            const error = new Error("Invalid payment date.");
            error.status = 400;
            throw error; 
        }
    };

    // Validate the new membership if the owner wants to change it:
    if (newData.membership_id !== undefined){
        const newMembershipId = Number(newData.membership_id);
        // Ensure the membership ID is a positive integer:
        if(!Number.isInteger(newMembershipId) || newMembershipId <= 0){
            const error = new Error("Invalid membership ID.");
            error.status = 400;
            throw error; 
        }
        // Check whether this membership belongs to the same member as the payment being edited:
        const membershipResult = await pool.query(
            `SELECT p.payment_id
            FROM payments p
            JOIN memberships ms
                ON ms.member_id = p.member_id
            WHERE p.payment_id = $1
                AND ms.membership_id = $2`,
                [paymentId, newMembershipId]
        );
        // Reject the update it the payment doesn't exist 
        // or the membership doesn't belong to its member.
        if (membershipResult.rows.length === 0){
            const error = new Error("Payment not found or membership does not belong to this member.");
            error.status = 400;
            throw error; 
        }
        // Use the validated numeric ID in the update query:
        newData.membership_id = newMembershipId;
    }

    // Getting the values of the matching data inputs :
    const values = fields.map((f)=> newData[f]);

    // We have to push the ID at the end of array because it has to be included to find that member 
    // and be inside values array 
    // which is going to be passed over in the SQL QueryValue part and that part 
    // Only accepts one array of Value:
    values.push(paymentId);

    // Making and combination the fields and values into one setClause
    const setClause = fields.map((field,index)=> `${field} = $${index + 1}`)
    .join(", ")

    const result = await pool.query(
        `UPDATE payments
        SET ${setClause} 
        WHERE payment_id = $${fields.length + 1} 
        RETURNING 
        payment_id, member_id, membership_id, amount,
        TO_CHAR(payment_date , 'YYYY-MM-DD') AS payment_date,
        payment_method`,
        values
    );

    // Checking what if the sipplied payment ID doesn't exist:
    if (result.rows.length === 0){
        const error = new Error("Payment not found.");
        error.status = 404;
        throw error;
    }
    
    return result.rows[0];
};


export async function getPaymentSummary() {
    

    // We use SUM() to add up all the 'amount' values to find out the total income.
    // We use COALESCE() to prevent getting 'null' if the table is empty, returns 0 instead.
    // We use COUNT(*) to count all rows to find the total number of payment transactions.

    const totalResult = await pool.query(
        `SELECT COALESCE(SUM(amount), 0) AS total_income,
        COUNT(*) AS total_count
        FROM payments`
    );

    // We use DATE_TRUNC('month', CURRNET_DATE) to snap the date to the exact 1st day of the current month(e.g., 2026-10-1)
    // We add INTERVAL '1 month' to create an upper boundary, capturing everything up until next month starts.

    const lastMonthResult = await pool.query(
        `SELECT SUM(amount) AS last_month_income,
        COUNT(*) AS last_month_count
        FROM payments
        WHERE payment_date >= DATE_TRUNC('month', CURRENT_DATE)
        AND payment_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`
    ); 

    return {
        totalIncome: totalResult.rows[0].total_income,
        totalNumberOfPayments: totalResult.rows[0].total_count,
        lastMonthIncome: lastMonthResult.rows[0].last_month_income,
        numberOfLastMonthPayments: lastMonthResult.rows[0].last_month_count
    };
};


export async function deleteSpecificPayment(paymentId) {
    
    const result = await pool.query(
        `DELETE FROM payments
        WHERE payment_id = $1
        RETURNING payment_id`,
        [paymentId]
    );    
    if(result.rows.length === 0){
        const error = new Error("Payment not found.");
        error.status = 404;
        throw error;
    };

    return result.rows[0];
}