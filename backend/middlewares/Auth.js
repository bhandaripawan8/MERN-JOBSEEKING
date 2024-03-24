import jwt from 'jsonwebtoken';
import { User } from '../model/User.js';
import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandler from './error.js';

export const isAuthorised = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('User not authorised', 400));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next(); 
    } catch (err) {
        return next(new ErrorHandler('Invalid token', 401));
    }
});
