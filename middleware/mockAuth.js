const User = require('../models/userModel'); // Adjust the path as needed

async function mockAuth(req, res, next) {
  try {
    const user = await User.findById('670b850617dea7e08d25b861');
    if (!user) {
      return res.status(401).json({ message: 'Mock user not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = mockAuth;
