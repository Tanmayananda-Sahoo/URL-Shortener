import express from 'express';
import shortUrlRoutes from './src/routes/shortUrl.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/v1',shortUrlRoutes);

export default app;