import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your Name'],
        minLength: [3, "Name must contain at least three characters"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        validate: [validator.isEmail, "Please provide a valid email"]
    },

    phone: {
        type: String,
        required: [true, "Please provide your Phone Number"]
        // Add additional validation if necessary
    },

    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [8,"Password must contain at least eight characters"],
        maxLength: [32, "Password cannot exceed 32 characters"]
        // Add additional complexity requirements if necessary
    },

    role: {
        type: String,
        required: [true, "Please provide your role"],
        enum: ["job seeker", "employer"] // Corrected typo
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token for authorization
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


export const User = mongoose.model('User', userSchema)
