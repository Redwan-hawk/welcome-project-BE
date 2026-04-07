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

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await userModel.loginUser(username, password);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(401).json({ error: 'Invalid username or password' });
  }
};
