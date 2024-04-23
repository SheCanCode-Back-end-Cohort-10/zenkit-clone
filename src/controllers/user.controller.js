import UserModel from "../models/user.model.js";
import asyncWrapper from "../middlewares/async.js";
import bcryptjs from 'bcryptjs';
import { BadRequestError } from "../errors/index.js";
import { validationResult } from "express-validator";
import { sendEmail } from "../utils/sendEmail.js";
import { otpGenerator } from "../utils/otp.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import jwt from "jsonwebtoken";

export const SignUp = asyncWrapper(async(req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    // Checking if the user is already in using the email
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (foundUser) {
        return next(new BadRequestError("Email already in use"));
    };

    // Harshing the user password
    const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

    // Generating OTP
    const otp = otpGenerator();
    const otpExpirationDate = new Date().getTime()+(60*1000*5);
    
    // Recording the user to the database
    const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        otp: otp,
        otpExpires: otpExpirationDate,
    });
    
    const savedUser = await newUser.save();
    // console.log(savedUser);

    sendEmail(req.body.email, "Verify your account", `Your OTP is ${otp}`);

    if (savedUser) {
        return res.status(201).json({
            message: "User account created!",
            user: savedUser
        });
    }
});

export const ValidateOpt = asyncWrapper(async(req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    // Checking if the given opt is stored in our database
    const foundUser = await UserModel.findOne({ otp: req.body.otp });
    if (!foundUser) {
        next(new UnauthorizedError('Authorization denied'));
    };

    // Checking if the otp is expired or not.
    if (foundUser.otpExpires < new Date().getTime()) {
        next(new UnauthorizedError('OTP expired'));
    }

    // Updating the user to verified
    foundUser.verified = true;
    const savedUser = await foundUser.save();

    if (savedUser) {
        return res.status(201).json({
            message: "User account verified!",
            user: savedUser
        });
    }
});

export const SignIn = asyncWrapper(async(req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    // Find user
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (!foundUser) {
        return next(new BadRequestError("Invalid email or password!"));
    };

    // Verify password
    const isPasswordVerfied = await bcryptjs.compareSync(req.body.password, foundUser.password);
    if(!isPasswordVerfied) {
        return next(new BadRequestError("Invalid email or password!"));
    }

    // Generate token
    const token = jwt.sign({ id: foundUser.id, email: foundUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
        message: "User logged in!",
        token: token,
        user: foundUser
    });
;});