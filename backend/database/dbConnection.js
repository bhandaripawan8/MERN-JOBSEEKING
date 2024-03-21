import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect(process.env.MONGOOSE_URI, {
        dbName: "MERN_STACK_JOB_SEEKING",
    })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
}
