import jwt from 'jsonwebtoken';
import {User} from '../models/user.models.js';

const authenticateUser = async(req, res, next) => {
        const token = req.cookies.token || "";

        if(token == "") {
            return res.status(400)
            .json({
                message: "Unauthorized user."
            })
        }

        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
        
        if(!decodedToken) {
            return res.status(400)
            .json({
                message: "Problem in verifying you."
            })
        }

        const user = await User.findById({_id: decodedToken.userId})

        if(!user) {
            return res.status(400)
            .json({
                message: "Problem in verifying you."
            })
        }

        req.user = user;
        next();
}

export default authenticateUser;