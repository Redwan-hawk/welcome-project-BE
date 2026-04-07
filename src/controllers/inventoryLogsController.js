const inventoryLogsModel = require('../models/inventoryLogsModel');

exports.getAllInventoryLogs = async (req, res) => {
    try {
        const inventoryLogs = await inventoryLogsModel.getAllInventoryLogs();
        res.status(200).json(inventoryLogs);
    } catch (err) {
        console.error('Error fetching inventory logs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/inventory-logs - Completed`);
    }
};