const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require("./src/database/mongoose.database.js");

dotenv.config();

const server = express();
const PORT = 8000;

connectToDatabase();

server.get('/', (req, res)=>{
    const tasks = [{ description: "Estudar"}]
    res.status(200).send(tasks)
})

server.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})