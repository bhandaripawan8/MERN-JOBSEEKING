import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/UserRouter.js'
import applicationRouter from './routes/ApplicationsRouter.js'
import jobRouter from './routes/JobRouter.js'
import {dbConnection} from './database/dbConnection.js'
import errorMiddleware from './middlewares/error.js';

const app = express();
dotenv.config();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    method: ['GET','POST', 'DELETE', 'Put'],
    credentials: true,
}))

app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);
dbConnection();

// error middleware should be used at the end
app.use(errorMiddleware);


export default app;