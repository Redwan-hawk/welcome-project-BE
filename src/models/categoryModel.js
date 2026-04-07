const pool = require('../db');

exports.getAllCategories = async () => {
    try {
        const res = await pool.query('SELECT * FROM categories');
        return res.rows;
    } catch (err) {
        console.error('Error fetching categories:', err);
        throw err;
    }
}; 
