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

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userModel.getUserById(userId);
    if (result.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    console.log(`[${new Date().toISOString()}] GET /api/users/${req.params.id} - Completed`);
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const { user_name, user_email } = req.body;
    const result = await userModel.updateUserInfo(userId, user_name, user_email);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    } 
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    console.log(`[${new Date().toISOString()}] PUT /api/users/${req.params.id} - Completed`);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const userId = req.params.id;
    // Get both passwords from the request body
    const { currentPassword, newPassword } = req.body;

    const result = await userModel.updateUserPassword(userId, currentPassword, newPassword);

    if (result.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    } 
    
    if (result.status === 401) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating user password:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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
