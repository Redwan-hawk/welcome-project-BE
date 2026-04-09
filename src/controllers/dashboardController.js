const inventoryModel = require('../models/inventoryModel');
const categoryModel = require('../models/categoryModel');

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