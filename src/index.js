// IMPORTS
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import authRouter from './routes/auth.js';
import { tokenRouter } from './routes/token.js';

// VARS
const PORT = process.env.PORT;
const DB_STRING = process.env.DB_STRING;

const app = express();

// MIDDLEWARES
app.use((err, req, res, next) => {
    console.log('------------------ Error occurred ------------------ \n', err);
    res.send('------------------ Error occurred ------------------ \n', err);
});
app.use(
    express.json({
        type: ['application/json', 'text/plain'],
    })
);
const corsOptions = {
    origin: true,
    // methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD'],
    credentials: true,
};
app.use(cors(corsOptions));


// ROUTES
app.get('/', (req, res) => {
    res.send('MTS Backend - by Shresth Ojha');
});

app.use('/auth', authRouter);
app.use('/token', tokenRouter);

mongoose.connect(DB_STRING);

mongoose.connection.on('connected', () => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});

mongoose.connection.on('error', (error) => {
    console.log(
        '------------------ Error occurred while connecting to DB ------------------ \n',
        error
    );
});
