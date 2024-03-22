

import {catchAsyncError} from './CatchAsyncError.js';
import ErrorHandler from './Error.js';
import jwt from 'jsonwebtoken'
import {User} from '../model/User.js'

export const isAuthorised = catchAsyncError(async(req, res, next) =>{
    const {token} = req.cookies;
    if(!token) {
        return next(new ErrorHandler('User not authorised', 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id)
})