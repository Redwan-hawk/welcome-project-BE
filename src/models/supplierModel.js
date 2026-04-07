const pool = require('../db');

exports.getAllSuppliers = async () => {
    try {
        const res = await pool.query('SELECT * FROM supplier ORDER BY supplier_id');
        return res.rows;
    } catch (err) {
        console.error('Error fetching suppliers:', err);
        throw err;
    }
};

exports.getSuppliersByName = async (search) => {
    try {
        let query = 'SELECT * FROM supplier';
        let params = [];
        
        if (search) {
            query += ' WHERE supplier_name ILIKE $1';
            params.push(`%${search}%`);
        }
        
        query += ' ORDER BY id';
        const res = await pool.query(query, params);
        return res.rows;
    } catch (err) {
        console.error('Error fetching suppliers by name:', err);
        throw err;
    }
};