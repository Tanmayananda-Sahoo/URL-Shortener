import express from 'express';
import shortUrlRoutes from './src/routes/shortUrl.routes.js';
import userRoutes from './src/routes/user.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/v1',shortUrlRoutes);
app.use('/v1/users', userRoutes);

export default app;