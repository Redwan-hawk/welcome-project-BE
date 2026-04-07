const pool = require('../db');

exports.getAllInventoryItems = async () => {
    try {
        const res = await pool.query('SELECT * FROM inventory WHERE deleted_at IS NULL');
        return res.rows;
    } catch (err) {
        console.error('Error fetching inventory items:', err);
        throw err;
    }   
};

exports.getLowStockItems = async (threshold) => {
    try {
        const res = await pool.query(`
            SELECT inventory_id, inventory_name, inventory_quantity, inventory_location
            FROM inventory
            WHERE inventory_quantity < $1
            AND deleted_at IS NULL
        `, [threshold]);
        return res.rows;
    } catch (err) {
        console.error('Error fetching low stock items:', err);
        throw err;
    }
};

exports.getTotalInventoryQuantity = async () => {
    try {
        const res = await pool.query(`
            SELECT COALESCE(SUM(inventory_quantity), 0) as total
            FROM inventory
            WHERE deleted_at IS NULL
        `);
        return parseInt(res.rows[0].total);
    } catch (err) {
        console.error('Error getting total inventory quantity:', err);
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

exports.getLowStockCount = async () => {
    try {
        const res = await pool.query(`
            SELECT COUNT(*) as count
            FROM inventory
            WHERE inventory_quantity < 10
            AND deleted_at IS NULL
        `);
        return parseInt(res.rows[0].count);
    } catch (err) {
        console.error('Error getting low stock count:', err);
        throw err;
    }
exports.searchInventoryByName = async (searchTerm) => {
    const result = await pool.query(
        "SELECT * FROM inventory WHERE inventory_name ILIKE $1",
        [`%${searchTerm}%`]
    );

    return result.rows;
};