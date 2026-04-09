const inventoryModel = require('../models/inventoryModel');
const categoryModel = require('../models/categoryModel');

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

exports.getDiscontinuedItems = async (req, res) => {
    try {
        const discontinuedItems = await inventoryModel.getDiscontinuedItems();
        res.status(200).json(discontinuedItems);
    } catch (err) {
        console.error('Error fetching discontinued items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/inventory/discontinued - Completed`);
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const totalItems = await inventoryModel.getTotalInventoryCount();
        const lowStock = await inventoryModel.getLowStockCount();
        const categoriesCount = await categoryModel.getCategoriesCount();
        const checkedOut = 0; 
        
        res.status(200).json({
            totalItems: totalItems,
            lowStock: lowStock,
            checkedOut: checkedOut,
            categories: categoriesCount
        });
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};