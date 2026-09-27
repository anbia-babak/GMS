import pool from "../db/pool.js";

export async function getMembers() {

    const result = await pool.query(
        "SELECT * FROM members ORDER BY member_id");
    return result.rows;
};

export async function addMember(memberData) {

    console.log(memberData);
    const {first_name, last_name, phone, gender, date_of_birth, address, join_date, status} = memberData;
    const result = await pool.query(
        `INSERT INTO members (first_name, last_name, phone, gender, date_of_birth, address, join_date, status)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [first_name, last_name, phone, gender, date_of_birth, address, join_date, status]
    );

    return result.rows[0];
};

export async function getSpecificMember (memberId){
    
    console.log(memberId);
    const result = await pool.query(
        "SELECT * FROM members WHERE member_id = ($1)",[memberId]
    ); 
    return result.rows[0];    
};

export async function editSpecificMember(memberId, newData) {
    
    // The fields which the woner changes must include only these fields:
    const allowedChangeFields = [
        "first_name", "last_name", "phone", "address", "gender", "date_of_birth", "join_date"
    ];
    
    console.log("NEW DATA: ", newData);
    console.log("NEW DATA KEYS: ",Object.keys(newData));
    
    
    // Finiding which data inputs match with the allowedChangeFields list :
    // We use Object.keys() to get ONLY the keys of the newData object?
    const fields = Object.keys(newData).filter((field)=> allowedChangeFields.includes(field));
    
    // Getting the values of the matching data inputs :
    const values = fields.map((f)=> newData[f]);
    
    // We have to push the ID at the end of array because it has to be included to find that member 
    // and be inside values array 
    // which is going to be passed over in the SQL QueryValue part and that part 
    // Only accepts one array of Value:
    values.push(memberId);

    // Making and combination the fields and values into one setClause
    const setClause = fields.map((field,index)=> `${field} = $${index + 1}`)
    .join(", ")

    console.log("Fields: ", fields);
    console.log("Set Clause: ", setClause);
    console.log("Values: ", values);
    

    const result = await pool.query(
        `UPDATE members
        SET ${setClause} 
        WHERE member_id = $${fields.length + 1} RETURNING *`,
        values
    );

    console.log("Datbase Result: ", result.rows[0]);
    
    return result.rows[0];
};

export async function deactivateSpecificMember(memberId) {

    const result = await pool.query(
        `UPDATE members
        SET status = 'Deactive'
        WHERE member_id = $1
        RETURNING * `,memberId
    );
    return result.rows[0];
}