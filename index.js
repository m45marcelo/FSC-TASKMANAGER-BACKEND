const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require("./src/database/mongoose.database.js");
const TaskModel = require('./src/models/task.model.js');

dotenv.config();

const server = express();
server.use(express.json()) /// Fala para o expres que a gente vai receber json na body das requisições
const PORT = 8000;

connectToDatabase();

server.get('/tasks', async (req, res)=>{
    try{
        const tasks = await TaskModel.find({})
        res.status(200).send(tasks)
    } catch(erro){
        res.status(500).send(erro.message)
    }
});

server.post("/tasks", async (req, res) =>{
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.mensage)
    }
} );

server.delete("/tasks/:id", async (req, res)=>{
    try{
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if(!taskToDelete){
            return res.status(500).send("Essa tarefa não foi encontrada.")
        }


        const deletedTask = await TaskModel.findByIdAndDelete(taskId)

        res.status(200).send(deletedTask)
    } catch (error) {
        res.status(500).send(error.mensage)
    }
})

server.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})