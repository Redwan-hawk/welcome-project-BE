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

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.getCategoryById(id);
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        res.status(200).json(category);
    } catch (err) {
        console.error('Error fetching category:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/categories/${req.params.id} - Completed`);
    }
};