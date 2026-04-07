const supplierModel = require('../models/supplierModel');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.getAllSuppliers();
        res.status(200).json(suppliers);
    } catch (err) {
        console.error('Error fetching suppliers:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/suppliers - Completed`);
    }
};

exports.getSuppliersByName = async (req, res) => {
    try {
        const search = req.query.search || ''; 
        const suppliers = await supplierModel.getSuppliersByName(search);
        res.status(200).json(suppliers);
    } catch (err) {
        console.error('Error fetching suppliers by name:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/suppliers/search - Completed. Search: "${req.query.search}"`);
    }
};