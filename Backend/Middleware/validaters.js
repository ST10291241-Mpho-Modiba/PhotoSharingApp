import {body, validationResult} from 'express-validator';

export const validateSignUp = [
body('username')
.notEmpty()
.withMessage('Username is required')
.isLength({min:3})
.withMessage('Username must be at least three characters long'),

body('email')
.notEmpty()
.withMessage('Email is required'),

body('password')
.notEmpty()
.withMessage('Password is required')
.isLength({min:6}).withMessage('Password must be at least 6 characters long'),

(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array})
    }
    next();
}
]

export const validateLogin = [
body('email')
.notEmpty().withMessage('Email is required')
.isEmail().withMessage('Enter a valid email'),

body('password')
.notEmpty()
.withMessage('Password is required')
.withMessage('Password must be at least 6 characters long'),

(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array})
    }
    next();
}
]

export const validatePhotoUpdate=[
body('title').optional().isLength({min: 3}).withMessage('Title must be at least 3 character'),
body('desciption').optional().isString(),

(req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}
];

export const validateUserUpdate =[
    body('username').optional().isLength({min: 3}).withMessage('Username must be at least 3 characters'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    (req,res,next)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors:error.array()})
        }
        next();
    }
];



