
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  // console.log("hhh", req.headers.authorization);
  
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("decoded", decoded);
    req.user = await User.findById(decoded.id).select('-password');
    // console.log("kkkkk", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
