const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await userModel.getAllUsers();
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    console.log(`[${new Date().toISOString()}] GET /api/users - Completed`);
  }   
};
