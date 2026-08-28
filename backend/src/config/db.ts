import { Pool } from "pg";

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

const pool = new Pool({
    connectionString: process.env.DB_URL
})

pool.query("SELECT NOW()")
    .then((result) => {
        console.log("Database connected:", result.rows[0]);
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

export default pool;
// import postgres from 'postgres'

// const connectionString = process.env.DATABASE_URL
// const sql = postgres(connectionString)

// export default sql