import db from '../config/db';

export const createUser = async (name:string, email:string, isGust:boolean):Promise<any>=>{
    const result = await db.query(
        `INSERT INTO "Users" (name, email, is_gust)
        VALUES ($1,$2,$3)
        RETURNING *`,
        [name, email, isGust]
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

// export const deleteUser = async (id: number): Promise<any> => {
//     console.log('Deleting user with ID:', id);
//     db.query('BEGIN'); // Start a transaction
//     db.query('DELETE FROM "Expressions" WHERE user_id = $1', [id]); // Delete associated expressions
//     db.query('COMMIT'); // Commit the transaction
//     const result = await db.query(
//         `DELETE FROM "Users"
//          WHERE user_id = $1
//          RETURNING *`,
//         [id]
//     );
//     console.log('Deleted user with ID:', id);

//     return result.rows[0];
// };


export const deleteUser = async (id: number): Promise<any> => {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            'DELETE FROM "Expressions" WHERE user_id = $1',
            [id]
        );

        const result = await client.query(
            `DELETE FROM "Users"
             WHERE user_id = $1
             RETURNING *`,
            [id]
        );

        await client.query('COMMIT');

        console.log('Deleted user with ID:', id);
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};