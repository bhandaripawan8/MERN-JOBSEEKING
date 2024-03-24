
import express from 'express';
import { getAllJobs, getmyJobs, postJob, updateJob } from '../controllers/JobController.js';
import { isAuthorised } from '../middlewares/Auth.js';


const router = express.Router();

router.get('/job/getall', getAllJobs);
router.post('/job/post', isAuthorised, postJob);
router.post('/job/getmyjobs', isAuthorised, getmyJobs);
router.post('/job/updatemyjob/:id', isAuthorised, updateJob);

export default router;