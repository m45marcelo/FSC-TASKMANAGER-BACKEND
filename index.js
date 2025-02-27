const express = require('express');
const dotenv = require('dotenv');
const TaskRouter = require('./src/routes/task.routes.js')

const connectToDatabase = require("./src/database/mongoose.database.js");

dotenv.config();

const server = express();
server.use(express.json()); // Indica que o servidor aceita JSON no body das requisições

const PORT = 8000;

connectToDatabase();

server.use("/tasks", TaskRouter);

// 🚀 Inicializa o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
