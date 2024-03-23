
import express from 'express';
import { getAlljobs, postJob } from '../controllers/JobController.js'
import { isAuthorised } from '../middlewares/Auth.js';


const router = express.Router();

router.get('/getall', getAlljobs);
router.post('/post', isAuthorised, postJob)

export default router;