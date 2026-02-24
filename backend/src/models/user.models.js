import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 12,
        select: false
    }
})

userSchema.pre('save', async function() {
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            userId: this._id
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const User = new mongoose.model('User', userSchema);