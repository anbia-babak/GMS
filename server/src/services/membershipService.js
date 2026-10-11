import pool from "../db/pool.js";

export async function addMembership(membershipData) {

    const {member_id, plan_id, start_date, expiration_date} = membershipData;
    const result = await pool.query(
        `INSERT INTO memberships (member_id, plan_id, start_date, expiration_date)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [member_id, plan_id, start_date, expiration_date]
    );
    return result.rows[0];
};



export async function getSpecificMemberCMemberships(member_id) {
    
    const result = await pool.query(
        `SELECT * FROM memberships 
        WHERE member_id = $1`,[member_id]
    );
    
    return result.rows;
};



export async function editSpecificMembership(membershipId, newData){


    // Calculating the Expiration date of a membership:
    // We need to know the membership's current plan and start date:
    const currentResult = await pool.query(
        `SELECT plan_id, start_date
        FROM memberships
        WHERE membership_id = $1`,
        [membershipId]
    );
    const currentMembership = currentResult.rows[0];

    if(!currentMembership){
        const error = new Error("Membership not found!");
        error.status = 404;
        throw error; 
    };

    const planId = newData.plan_id ?? currentMembership.plan_id;
    const startDate = newData.start_date ?? currentMembership.start_date;

    // Getting the plan duration(months), how many months does planId represents?:
    const planResult = await pool.query(
        `SELECT duration_month 
        FROM membership_plans
        WHERE plan_id = $1`,
        [planId]
    );

    if(planResult.rows.length === 0){
        const error = new Error("Membership plan not found!");
        error.status = 404;
        throw error; 
    }
    const durationMonths = planResult.rows[0].duration_month;
 
    // Becasue the planId , startDate , and the expirationDate are logically related;
    // WE NEED to refuse to the DYNAMIC Approach which is used for a MEMBER ,
    // expirationDate depends on planId + startDate , SO WE NEED to query them explicitly!!
    // update membership + calculate expiration:

    const result = await pool.query(
        `UPDATE memberships
        SET
            plan_id = $1, 
            start_date = $2,
            expiration_date = ($2::date + ($3::int * INTERVAL '1 month'))::date

        WHERE membership_id = $4
        RETURNING 
            membership_id,
            member_id,
            plan_id,
            start_date::text AS start_date,
            expiration_date::text AS expiration_date`,
        [planId, startDate, durationMonths, membershipId]
    );

    return result.rows[0];
};



export async function getAllMemberships(search, status, plan_id) {

    // We Join the members, memberships, and membership_plans tables to show them in one single table
    // we use INNER JOIN to MERGE them together and 
    // we USE (CASE WHEN) to caluculate and display the status on the table
    // Instead of calculating them explicitly !

    let query = `SELECT
            ms.membership_id,
            ms.member_id,
            m.member_id,
            CONCAT(m.first_name, ' ', m.last_name) AS member_name,
            mp.plan_name,
            ms.start_date,
            ms.expiration_date,

            CASE
                WHEN ms.expiration_date < CURRENT_DATE
                    THEN 'Expired'
                WHEN ms.expiration_date <= CURRENT_DATE + INTERVAL '7 days'
                    THEN 'Expiring Soon'
                ELSE 'Active'
            END AS status        

            FROM memberships ms
            JOIN members m ON m.member_id = ms.member_id
            JOIN membership_plans mp ON  mp.plan_id = ms.plan_id `


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
                OR CAST(ms.member_id AS TEXT) ILIKE $${values.length}
            )`
        );
    }
    // conditions.length > 0 checks if user selected any filters (WHERE clause) : 
    if (conditions.length > 0) {
        // we use JION("AND") to add ADD between SQL Quries:
        // status condition , search condition, ms.plan_id = $2
        // => to : status condition AND search condotion AND ms.plan_id = $2 TO MAKE IT A CORRCET QUERY! 
        // (combines all filter conditions with AND to create the WHERE clause.)
        query += `WHERE ${conditions.join(" AND ")}`;
    };
    query += ` ORDER BY ms.membership_id`;
    // add SORTING to the final SQL query.
    const result = await pool.query(query,values);
    return result.rows
};



export async function getSpecificMembership(membershipId) {
    
    const result = await pool.query(
        `SELECT * 
        FROM memberships
        WHERE membership_id = $1`,
        [membershipId]
    );
    return result.rows[0];
};


export async function renewSpecificMembership(membershipId, newDate, planId) {
    
    const currentResult = await pool.query(
        `SELECT * 
        FROM memberships
        WHERE membership_id = $1`,
        [membershipId]
    );
    
    const currentMembership = currentResult.rows[0]; 
    if(!currentMembership){
        const error = new Error("Membership not found!");
        error.status = 404;
        throw error; 
    };

    const planResult = await pool.query(
        `SELECT plan_id, duration_month
        FROM membership_plans
        WHERE plan_id = $1`,
        [planId]
    );

    if(planResult.rows.length === 0){
        const error = new Error("Membership plan not found!");
        error.status = 404;
        throw error; 
    };

    const currentPlan = planResult.rows[0].plan_id;
    const newStartDate = newDate;
    const newPlan = planId;
    const durationMonth = planResult.rows[0].duration_month;

    // Checking that a new membership must not start while another membership for the same member is still active:
    const overLappingMembers = await pool.query(
        `SELECT membership_id
        FROM memberships
        WHERE member_id = $2
        AND membership_id <> $3
        AND start_date <= $1
        AND expiration_date >= $1
        LIMIT 1`,
        [newStartDate, currentMembership.member_id, membershipId]
    );
    if(overLappingMembers.rows.length > 0){
        const error = new Error("The member already has a membership covering this start date");
        error.status = 404;
        throw error; 
    }

    const result = await pool.query(
        `INSERT INTO memberships (member_id, plan_id, start_date, expiration_date)
        VALUES (
        $1,$2,$3,
        ($3::date + ($4::int * INTERVAL '1 month')
        )::date
    )
        RETURNING 
        membership_id, member_id, plan_id,
        start_date::text AS start_date,
        expiration_date::text AS expiration_date`,
        [currentMembership.member_id, newPlan, newStartDate, durationMonth]
    );
    return result.rows[0];
};



