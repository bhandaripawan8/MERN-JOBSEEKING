
import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/Error.js";
import { User } from "../model/User.js";
import {sendToken} from '../utils/jwtToken.js'

export const register = catchAsyncError(async(req, res, next) =>{
    const {name, email, phone, role, password} = req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler('Please fill full registraion form'))
    }
    const isEmail = await User.findOne({email})
    if(isEmail){
        return next(new ErrorHandler('Email already exists'))
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    });
    res.status(200).json({
        success: true,
        message: "user registered successfully",
        user
    })
})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(
            new ErrorHandler('Please provide email, password, and role', 400)
        );
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler('Invalid email or password', 400));
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler('Invalid email or password', 400));
        }

        if (user.role !== role) {
            return next(new ErrorHandler('Invalid role', 400));
        }
        sendToken(user, 200, res, "User Logged in successfully!");
    } catch (error) {
        next(error);
    }
});

export const logout = catchAsyncError(async(req, res, next) =>{
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Logged out successfully"
    });
})


