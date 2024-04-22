import express from 'express';
const userRouter = express.Router();
import { SignUp, SignIn } from '../controllers/user.controller.js';
import { signUpValidations, signInValidations } from '../utils/validation.js';

userRouter.post('/signup', signUpValidations, SignUp);
userRouter.post('/signin', signInValidations, SignIn);

export default userRouter;