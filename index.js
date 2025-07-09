const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'testuser',
  password: process.env.DB_PASSWORD || 'testpass',
  database: process.env.DB_NAME || 'testdb',
  port: process.env.DB_PORT || 5432,
});

async function main() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name TEXT);`);
  await pool.query(`INSERT INTO users(name) VALUES('Alice');`);
  const res = await pool.query(`SELECT * FROM users;`);
  console.log('Users in DB:', res.rows);
  await pool.end();
}

main().catch(console.error);
