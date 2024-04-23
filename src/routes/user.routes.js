import express from 'express';
const userRouter = express.Router();
import { SignUp, SignIn, ValidateOpt } from '../controllers/user.controller.js';
import { signUpValidations, signInValidations, otpValidation } from '../utils/validation.js';

userRouter.post('/signup', signUpValidations, SignUp);
userRouter.post('/signin', signInValidations, SignIn);
userRouter.post('/verify', otpValidation, ValidateOpt);

export default userRouter;