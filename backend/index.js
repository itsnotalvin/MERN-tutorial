import express from "express";
import config, { PORT } from "./config.js";
import mongoose from 'mongoose';
import 'dotenv/config';
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors'

const app = express();

const { mongoDBURL } = config;

// Middleware for parsing request body
app.use(express.json());


// Allow origins with default of cors(*)
// app.use(cors())
//Custom origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

if (!mongoDBURL) {
    throw new Error('mongoDBURL is not defined. Check your env file and configuration')
}

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN tutorial')
});

app.use('/books', booksRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })