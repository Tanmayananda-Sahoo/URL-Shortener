import {Router} from 'express';
import { fetchUrls, generateShortUrl, redirectToOriginalUrl } from '../controllers/shortUrl.controllers.js';
import authenticateUser from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/generate').post(authenticateUser, generateShortUrl);
router.route('/:uniqueId').get(redirectToOriginalUrl);
router.route('/fetch/urls').get(authenticateUser, fetchUrls);

export default router;