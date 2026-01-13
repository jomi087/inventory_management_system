import express from 'express';
import cors from 'cors';

import { router } from './routes';
import { corsOptions } from './config/cors';
import { errorHandler } from './middleware/errorhandler';

export const app = express();

app.use(express.json({ limit: process.env.BODY_LIMIT }));
app.use(
    express.urlencoded({ extended: true, limit: process.env.URLENCODED_LIMIT })
);
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use('/api', router);

app.use(errorHandler)


app.get('/test', (req, res) => {
    res.send("INVENTORY MANAMENT API IS RUNNING")
})