import db from '../config/db';

export const createUser = async (name:string, email:string):Promise<any>=>{
    const result = await db.query(
        `INSERT INTO users (name, email)
        VALUES ($1,$2)
        RETURNING *`,
        [name, email]
    );
    reutrn result.rows[0]
};

export const getUsers = async ():Promise<any> => {
const result = await db.query(
    `SELECT * FROM users`
);

return result.rows;
}

export const getUserById = async (id:number):Promise<any>=>{
    const result = await db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [id]
    );

    return result.rows[0]
};
