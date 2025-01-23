import mysql from "mysql2/promise"

//MySQL database Pool
const { DB_HOST, DB_USER, DB_SCHEMA, DB_PASSWORD } = process.env

const mysqlPool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_SCHEMA,
    password: DB_PASSWORD,
})

export default mysqlPool
