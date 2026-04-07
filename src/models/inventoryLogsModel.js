const pool = require('../db');

exports.getAllInventoryLogs = async () => {
    try {
        const res = await pool.query('SELECT * FROM inventory_logs');
        return res.rows;
    } catch (err) {
        console.error('Error fetching inventory logs:', err);
        throw err;
    }
};