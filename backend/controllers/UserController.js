
import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/Error.js";
import { User } from "../model/User";

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