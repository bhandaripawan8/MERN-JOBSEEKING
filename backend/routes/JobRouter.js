
import express from 'express';
import { deleteJob, getAllJobs, getmyJobs, postJob, updateJob } from '../controllers/JobController.js';
import { isAuthorised } from '../middlewares/Auth.js';


const router = express.Router();

router.get('/job/getall', getAllJobs);
router.post('/job/post', isAuthorised, postJob);
router.get('/job/getmyjobs', isAuthorised, getmyJobs);
router.put('/job/updatemyjob/:id', isAuthorised, updateJob);
router.delete('/job/deletejob/:id', isAuthorised, deleteJob);

export default router;