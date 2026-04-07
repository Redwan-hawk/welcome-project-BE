const pool = require('../db');

exports.getAllSuppliers = async () => {
    try {
        const res = await pool.query('SELECT * FROM suppliers');
        return res.rows;
    } catch (err) {
        console.error('Error fetching suppliers:', err);
        throw err;
    }
};