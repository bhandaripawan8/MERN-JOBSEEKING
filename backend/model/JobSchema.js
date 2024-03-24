import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title"],
        minLength: [3, "Job title must be at least three characters"],
        maxLength: [50, "Job title must not exceed 50 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide the job description"],
        minLength: [3, "Job description must be at least 3 characters"],
        maxLength: [300, "Job description must not exceed 300 characters"]
    },
    category: {
        type: String,
        required: [true, "job Category is required"]
    },
    country: {
        type: String,
        required: [true, "Job country is required"]
    },
    city: {
        type: String,
        required: [true, "Please provide the city name"]
    },
    location: {
        type: String,
        required: [true, "Please provide exact location"],
        minLength: [50, "Job location must contain at least 50 characters"]
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Fixed salary must contain at least 4 digits"],
        maxLength: [9, "Fixed salary must not exceed at least 9 digits"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Fixed from must contain at least 4 digits"],
        maxLength: [9, "Fixed salary must not exceed at least 9 digits"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salaryto must contain at least 4 digits"],
        maxLength: [9, "Salaryto must not exceed 9 digits"]
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }
})
export const Job = mongoose.model('Job', jobSchema);
