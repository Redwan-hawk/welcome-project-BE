const pool = require('../db');

exports.getAllCategories = async () => {
    try {
        const res = await pool.query('SELECT * FROM category ORDER BY category_name');
        return res.rows;
    } catch (err) {
        console.error('Error fetching categories:', err);
        throw err;
    }
};

exports.getCategoriesCount = async () => {
    try {
        const res = await pool.query('SELECT COUNT(*) as count FROM category');
        return parseInt(res.rows[0].count);
    } catch (err) {
        console.error('Error getting categories count:', err);
        throw err;
    }
};