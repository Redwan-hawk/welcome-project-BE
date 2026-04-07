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

exports.getInventoryByCategoryID = async (categoryId) => {
    try {
        const result = await pool.query(
            "SELECT * FROM inventory WHERE category_id = $1",
            [categoryId]
        );

        return result.rows;

    } catch (err) {
        console.error('Error fetching inventory by category:', err);
        throw err;
    }
};

exports.searchInventoryByName = async (searchTerm) => {
    const result = await pool.query(
        "SELECT * FROM inventory WHERE inventory_name LIKE $1",
        [`%${searchTerm}%`]
    );

    return result.rows;
};