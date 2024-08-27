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
    console.log(request.body)
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


//Route to return all books and count

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({})

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})


// Route for get individual book via ID

app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params

        const book = await Book.findById(id)

        return response.status(200).json({
            requestedBook: book
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for updating book
app.put('/books/:id', async (request, response) => {
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
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body)

        if(!result) {
            return response.status(404).json({ message: 'Book not found'})
        }

        return response.status(200).send({ message: 'Book updated successfully'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }})


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