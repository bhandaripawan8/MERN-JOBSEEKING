
import express from 'express';
import {emploerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplications} from '../controllers/ApplicationController.js'
import { isAuthorised } from '../middlewares/Auth.js';

const router = express.Router();

router.get('/job/jobseeker/getall', isAuthorised,jobSeekerDeleteApplication)
router.get('/job/employer/getall', isAuthorised,emploerGetAllApplications)
router.delete('/job/delete/:id', isAuthorised,jobSeekerDeleteApplication)

export default router;