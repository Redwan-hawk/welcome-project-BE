const pool = require('../db');

exports.getAllInventoryItems = async () => {
    try {
        const res = await pool.query('SELECT * FROM inventory');
        return res.rows;
    } catch (err) {
        console.error('Error fetching inventory items:', err);
        throw err;
    }   
};