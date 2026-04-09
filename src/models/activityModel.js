const pool = require('../db');

exports.getActivityByUserId = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM activity WHERE user_id = $1 ORDER BY created_at DESC', [id]);
        return res.rows;
    } catch (err) {
        console.error('Error fetching activity by user ID:', err);
        throw err;
    }  
};

exports.logActivity = async (userId, activityType) => {
    try {
        const res = await pool.query(
            'INSERT INTO activity (user_id, activity_type, created_at) VALUES ($1, $2, NOW())',
            [userId, activityType]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Error logging activity:', err);
        throw err;
    }
};