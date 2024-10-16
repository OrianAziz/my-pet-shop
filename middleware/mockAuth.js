const User = require('../models/userModel'); // Adjust the path as needed

async function mockAuth(req, res, next) {
  console.log('mockAuth middleware called');
  try {
    const user = await User.findById('670b850617dea7e08d25b861');
    if (!user) {
      console.error('Mock user not found');
      return res.status(401).json({ message: 'Mock user not found' });
    }
    req.user = user;
    console.log('Mock user set:', req.user);
    next();
  } catch (error) {
    console.error('Mock auth error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = mockAuth;
