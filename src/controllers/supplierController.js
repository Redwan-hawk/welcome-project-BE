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