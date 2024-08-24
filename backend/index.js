import express from "express";
import config, { PORT } from "./config.js";
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

const { mongoDBURL } = config;

if (!mongoDBURL) {
    throw new Error('mongoDBURL is not defined. Check your env file and configuration')
}

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN tutorial')
});




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