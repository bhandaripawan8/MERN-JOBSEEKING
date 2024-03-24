
import express from 'express';
import {emploerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplications} from '../controllers/ApplicationController.js'
import { isAuthorised } from '../middlewares/Auth.js';

const router = express.Router();

router.get('/job/jobseeker/getall', jobSeekerDeleteApplication)
router.get('/job/employer/getall', emploerGetAllApplications)
router.delete('/job/delete/:id', isAuthorised,jobSeekerDeleteApplication)

export default router;