const express= require('express');

const TaskController = require('../controllers/task.controller')
const TaskModel = require('../models/task.model')

const router = express.Router();

// 📌 Rota para obter todas as tarefas
router.get('/', async (req, res) => {
    return new TaskController(req, res).getTasks();
});

// 📌 Rota para obter uma tarefa pelo ID
router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send('Essa tarefa não foi encontrada.');
        }

        return res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 📌 Rota para criar uma nova tarefa
router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 📌 Rota para atualizar uma tarefa (PATCH)
router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);
        console.log(taskToUpdate)
        console.log(taskData)
        if (!taskToUpdate) {
            return res.status(404).send("Essa tarefa não foi encontrada.");
        }

        const allowedUpdate = ["description"]; // Campos permitidos para edição
        const requestedUpdates = Object.keys(taskData); // Campos que o usuário quer atualizar

        for (const update of requestedUpdates) {
            if (allowedUpdate.includes(update)) {
                return res.status(400).send(`O campo "${update}" não é editável.`);
            }
            taskToUpdate[update] = taskData[update];
        }

        await taskToUpdate.save(); // Salva as mudanças no banco

        res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// 📌 Rota para deletar uma tarefa
router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);
        if (!taskToDelete) {
            return res.status(404).send("Essa tarefa não foi encontrada.");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;