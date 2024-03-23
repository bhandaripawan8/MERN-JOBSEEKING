import {catchAsyncError} from '../middlewares/CatchAsyncError.js'
import ErrorHandler from '../middlewares/Error.js'
import {Job} from '../model/Job.js'

export const getAlljobs = catchAsyncError(async(req, res, next) =>{
    // fetching only jobs which has not expired
    const jobs = await Job.find({expired: false});
    res.status(200).json({
        success: true,
        jobs,
    })
})

export const postJob = catchAsyncError(async(req, res, next) =>{
    const {role} = req.user;
    if(role === 'Job Seeker'){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources!", 411))
    }
    const {title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo} = req.body;
    if(!title || !description || !category || !country || !city || !location){
        return next (new ErrorHandler('Please provide all the details', 400))
    }
    if((!fixedSalary || !salaryFrom) && !salaryTo){
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary"))
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Cannot enter fixed salary and ranged salary together"))
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy
    })
    res.status(200).json({success: true, message: "Job posted successfully"}, job)
})

