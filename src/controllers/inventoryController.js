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

exports.getInventoryByCategoryID = async (req, res) => {
    try {
        const { category } = req.params;

        const inventoryItems = await inventoryModel.getInventoryByCategoryID(category);

        res.status(200).json(inventoryItems);
    } catch (err) {
        console.error("Error fetching inventory by category:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        console.log(`[${new Date().toISOString()}] GET /api/inventory/category/:category - Completed`);
    }
};


exports.searchInventoryByName = async (req, res) => {
    try {
        const { name } = req.query;

        const inventoryItems = await inventoryModel.searchInventoryByName(name);

        res.status(200).json(inventoryItems);

    } catch (err) {
        console.error('Error searching inventory:', err);
        res.status(500).json({ error: 'Internal Server Error' });

    } finally {
        console.log(
            `[${new Date().toISOString()}] GET /api/inventory/search?name=${req.query.name} - Completed`
        );
    }
};
