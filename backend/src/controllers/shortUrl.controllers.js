import {ShortUrl} from '../models/shortUrl.models.js';
import {generateId} from '../utils/generateId.utils.js';

const generateShortUrl = async(req,res) => {
    const {originalUrl} = req.body;
    const {slug} = req.body || "";

    if(!originalUrl) {
        return res.status(400)
        .json({
            message: 'Original URL is required.'
        })
    }
    let uniqueId;
    if(slug == "") {
        uniqueId = generateId(7);
    }
    else {
        uniqueId = slug;
    }
    
    //In a URL shortener application, users can create custom short names for their links. The requirement is that a single user should not be able to reuse the same custom slug more than once, but different users are allowed to use the same custom slug. In simple terms, the custom slug must be unique only within a specific user’s scope, not across the entire system. This creates a scoped uniqueness problem, where the combination of user and custom slug must be unique. The challenge is to ensure this properly at the database level to prevent duplication, especially in cases where multiple requests happen at the same time.

    const existingShortUrl = await ShortUrl.findOne({
        user: req.user._id,
        uniqueId
    });

    if(existingShortUrl) {
        return res.status(401)
        .json({
            message: "Slug is already in use."
        })
    }

    const createdShortUrl = await ShortUrl.create({
        originalUrl,
        uniqueId,
        user: req.user._id
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

const fetchUrls = async(req,res) => {
    const urls = await ShortUrl.find({
        user: req.user._id
    })
    return res.status(200)
    .json({
        message: "URLs fetched successfully.",
        urls
    })
}
export {generateShortUrl, redirectToOriginalUrl, fetchUrls};