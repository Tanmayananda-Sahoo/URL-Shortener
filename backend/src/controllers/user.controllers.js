import {User} from '../models/user.models.js';

const register = async(req,res) => {
    const {username, password} = req.body;

    if([username, password].some((field) => field.trim() == "")) {
        return res.status(401)
        .json({
            message: 'All the credentials are required.'
        })
    }

    if(password.length < 5 || password.length > 12) {
        return res.status(401)
        .json({
            message: 'Password must be between 5 to 12 characters.'
        })
    }

    const existingUser = await User.findOne({username});

    if(existingUser) {
        return res.status(401)
        .json({
            message: "User already exists."
        })
    }

    const createdUser = await User.create({
        username,
        password
    })

    const token = await createdUser.generateToken();

    return res.status(201)
    .cookie('token', token)
    .json({
        message: 'User created successfully.',
        user: createdUser,
        token
    })
}

const login = async(req,res) => {
    const {username, password} = req.body;

    if([username, password].some((field) => field.trim() == "")) {
        return res.status(401)
        .json({
            message: 'All the credentials are required.'
        })
    }

    if(password.length < 5 || password.length > 12) {
        return res.status(401)
        .json({
            message: 'Password must be between 5 to 12 characters.'
        })
    }

    const existingUser = await User.findOne({username}).select('+password');
    if(!existingUser) {
        return res.status(401)
        .json({
            message: "Invalid credentials."
        })
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    
    if(!isPasswordValid) {
        return res.status(401)
        .json({
            message: "Invalid credentials."
        })
    }

    const token = await existingUser.generateToken();

    return res.status(200)
    .cookie('token', token)
    .json({
        message: "User logged in successfully.",
        user: existingUser,
        token
    })
}

const logout = async(req,res) => {
    return res.status(200)
    .clearCookie('token')
    .json({
        message: 'User logged out successfully.'
    })
}

const verifyUser = async(req,res) => {
    return res.status(200)
    .json({
        message: 'User verified successfully.',
        user: req.user
    })
}

export {register, login, logout, verifyUser};