const pool = require('../db');

exports.getAllUsers = async () => {
    try {
        const res = await pool.query('SELECT * FROM users');
        return res.rows;
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }      
};

exports.loginUser = async (username, password) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE username = $1 AND user_password = $2', [username, password]);
        if (res.rows.length === 0) {
            throw new Error('Invalid username or password');
        }
        return res.rows[0];
    } catch (err) {
        console.error('Error logging in user:', err);
        throw err;
    }
};