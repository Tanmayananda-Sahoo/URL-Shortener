import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

shortUrlSchema.index({uniqueId: 1, user: 1}, {unique: true});

export const ShortUrl = new mongoose.model('ShortUrl', shortUrlSchema);