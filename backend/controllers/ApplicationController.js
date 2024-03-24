import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../model/ApplicationSchema.js";

export const emploerGetAllApplications = catchAsyncError(async(req, res,next) =>{
    const {role} = req.user;
    if(role === "job seeker"){
        return (next (new ErrorHandler("Job seeker is not allowed to access to this resources", 400)))
    }
    const {_id} = req.user;
    const applications = await Application.find({'employerId.user': _id})
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobSeekerGetAllApplications = catchAsyncError(async(req, res,next) =>{
    const {role} = req.user;
    if(role === "employer"){
        return (next (new ErrorHandler("employer is not allowed to access to this resources", 400)))
    }
    const {_id} = req.user;
    const applications = await Application.find({'applicantId.user': _id})
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobSeekerDeleteApplication = catchAsyncError(async(req, res, next)=>{
    const {role} = user.role;
    if(role === 'employer'){
        return next(new ErrorHandler("Employer is not allowed to delete the applications", 404))
    }
    const {id} = req.params;
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler('Oops, application not found!', 404))
    }
    await application.deleteOne();
    res.status(200).json({status: true, message: 'Application deleted successfully'})

})