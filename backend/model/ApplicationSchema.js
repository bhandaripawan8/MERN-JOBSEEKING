import mongoose, { Schema } from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minLength: [3, "Name must be at least three characters"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Please provide a valid email"],
        require: [true, 'Please provide an email']
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide your cover letter"]
    },
    phone: {
        type: Number,
        required: [true, "Please provide your phone number"]
    },
    address: {
        type: String,
        required: [true, 'Please provide your address!']
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    applicationId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["job seeker"],
            required: true
        }
    },
    employerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["employer"],
            required: true
        }
    }
})

export const Application = mongoose.model('Application', applicationSchema);