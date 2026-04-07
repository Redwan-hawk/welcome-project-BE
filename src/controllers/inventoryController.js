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

exports.getInventoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const inventoryItem = await inventoryModel.getInventoryById(id);
        
        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        
        res.status(200).json(inventoryItem);
    } catch (err) {
        console.error('Error fetching inventory item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/inventory/${req.params.id} - Completed`);
    }
};

exports.getLowStockItems = async (req, res) => {
    try {
        const threshold = req.query.threshold || 10;
        const lowStockItems = await inventoryModel.getLowStockItems(threshold);
        res.status(200).json(lowStockItems);
    } catch (err) {
        console.error('Error fetching low stock items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/inventory/low-stock - Completed`);
    }
};

