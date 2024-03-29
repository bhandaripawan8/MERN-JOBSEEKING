

import express from 'express';
import {register, login, logout, User} from '../controllers/UserController.js'
import {isAuthorised} from '../middlewares/Auth.js'

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthorised, logout);
router.get('/getuser', isAuthorised, User);


export default router;