import User from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';

// REGISTER
export const register = async (req, res, next) => {
  let { name, email, password } = req.body;
  try {
    email = email.toLowerCase(); // Normalize email to lowercase
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};


// LOGIN
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
