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

exports.getUserById = async (userId) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        return res.rows;
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err;
    }
};

exports.updateUserInfo = async (userId, name, email) => {
    try {
        const res = await pool.query(
            'UPDATE users SET username = $1, user_email = $2 WHERE user_id = $3',
            [name, email, userId]
        );
        return res;
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }  
};

exports.updateUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    // 1. Fetch the user's current record
    const userResult = await pool.query(
      'SELECT user_password FROM users WHERE user_id = $1', 
      [userId]
    );

    if (userResult.rowCount === 0) {
      return { status: 404 };
    }

    const storedPassword = userResult.rows[0].user_password;

    // 2. Verify the current password
    const isMatch = (currentPassword === storedPassword); // Plain text check

    if (!isMatch) {
      return { status: 401 };
    }

    // 3. Update to the new password
    await pool.query(
      'UPDATE users SET user_password = $1 WHERE user_id = $2',
      [newPassword, userId]
    );

    return { status: 200 };
  } catch (err) {
    console.error('Database Error:', err);
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