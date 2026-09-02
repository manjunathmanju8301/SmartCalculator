import db from '../config/db';

export const createUser = async (name:string, email:string):Promise<any>=>{
    const result = await db.query(
        `INSERT INTO "Users" (name, email)
        VALUES ($1,$2)
        RETURNING *`,
        [name, email]
    );
    return result.rows[0];
};

export const getUsers = async ():Promise<any> => {
const result = await db.query(
    `SELECT * FROM "Users" ORDER BY user_id DESC`
);

return result.rows;
}

export const getUserById = async (id:number):Promise<any>=>{
    const result = await db.query(
        `SELECT * FROM "Users"
        WHERE user_id = $1`,
        [id]
    );

    return result.rows[0]
};

export const deleteUser = async (id: number): Promise<any> => {
    const result = await db.query(
        `DELETE FROM "Users"
         WHERE user_id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

