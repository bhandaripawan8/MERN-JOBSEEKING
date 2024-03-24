import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../model/ApplicationSchema.js";
import cloudinary from 'cloudinary';

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

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === 'employer') {
        return next(new ErrorHandler('Employer is not allowed to post applications', 400));
    }

    // Check if files are provided
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler('Resume file required', 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    // Check if the file format is allowed
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Invalid file type. Please upload your resume in a png, jpg, or webp format.", 400));
    }

    // Upload resume to cloudinary
    const cloudinaryResponse = await cloudinary.upload(resume.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary error");
        return next(new ErrorHandler("Failed to upload resume", 500));
    }

    // Extract other fields from the request body
    const { name, email, coverLetter, phone, address, jobId } = req.body;

    // Check if jobId is provided
    if (!jobId) {
        return next(new ErrorHandler("Job not found", 404));
    }

    // Find job details by jobId
    const jobDetails = await Job.findById(jobId);

    // Check if jobDetails exist
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found", 404));
    }

    // Construct applicantId and employerId
    const applicantId = {
        user: req.user._id,
        role: "job seeker"
    };

    const employerId = {
        user: jobDetails.postedBy,
        role: "employer"
    };

    // Check if all required fields are provided
    if (!name || !email || !coverLetter || !phone || !address || !applicantId || !employerId || !cloudinaryResponse) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }

    // Create the application
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantId,
        employerId,
        resume: { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url }
    });

    res.status(200).json({
        success: true,
        message: 'Application submitted',
        application
    });
});

