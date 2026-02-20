import {ShortUrl} from '../models/shortUrl.models.js';
import {generateId} from '../utils/generateId.utils.js';

const generateShortUrl = async(req,res) => {
    const {originalUrl} = req.body;
    if(!originalUrl) {
        return res.status(400)
        .json({
            message: 'Original URL is required.'
        })
    }

    const uniqueId = generateId(7);
    
    const createdShortUrl = await ShortUrl.create({
        originalUrl,
        uniqueId
    })

    return res.status(201).
    json({
        message: 'Short URL generated successfully.',
        createdShortUrl
    })
}

const redirectToOriginalUrl = async(req,res) => {
    const {uniqueId} = req.params;
    if(!uniqueId) {
        return res.status(400)
        .json({
            message: 'No unique found.'
        })
    }

    const shortUrl = await ShortUrl.findOne({uniqueId});
    if(!shortUrl) {
        return res.status(400)
        .json({
            message: 'No short url is found.'
        })
    }

    res.redirect(`${shortUrl.originalUrl}`)
}
export {generateShortUrl, redirectToOriginalUrl};