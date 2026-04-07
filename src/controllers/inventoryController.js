const inventoryModel = require('../models/inventoryModel');

exports.getAllInventoryItems = async (req, res) => {
    try {
        const inventoryItems = await inventoryModel.getAllInventoryItems();
        res.status(200).json(inventoryItems);
    } catch (err) {
        console.error('Error fetching inventory items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/inventory - Completed`);
    }
};