import {Router} from 'express';
import { generateShortUrl, redirectToOriginalUrl } from '../controllers/shortUrl.controllers.js';

const router = Router();

router.route('/generate').post(generateShortUrl);
router.route('/:uniqueId').get(redirectToOriginalUrl);

export default router;