// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Token invalid' });

//     req.userId = decoded.id;
//     next();
//   });
// };


// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // req.user.email available
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Token invalid or expired' });
//   }
// };
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid or expired' });
  }
};
