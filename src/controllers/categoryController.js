const categoryModel = require('../models/categoryModel');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/categories - Completed`);
    }
}; 