const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon cloud connection
  },
});

// --- THE CHECK ---
pool.connect((err, client, release) => {
  if (err) {
    return console.error('NeonDB Connection Error:', err.stack);
  }
  console.log('NeonDB Connected Successfully!');
  release(); // Always release the client back to the pool
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};