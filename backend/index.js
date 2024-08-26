import express from "express";
import config, { PORT } from "./config.js";
import mongoose from 'mongoose';
import 'dotenv/config';
import { Book } from "./models/bookModel.js";

const app = express();

const { mongoDBURL } = config;

app.use(express.json());

if (!mongoDBURL) {
    throw new Error('mongoDBURL is not defined. Check your env file and configuration')
}

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN tutorial')
});

app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Please send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book)
        

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})



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