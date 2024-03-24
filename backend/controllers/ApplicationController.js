import { catchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../middlewares/error";
import { Application } from "../model/ApplicationSchema";

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