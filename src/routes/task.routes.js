const express= require('express');

const TaskController = require('../controllers/task.controller');

const router = express.Router();

// 📌 Rota para obter todas as tarefas
router.get('/', async (req, res) => {
    return new TaskController(req, res).getAllTasks();
});

// 📌 Rota para obter uma tarefa pelo ID
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
});

// 📌 Rota para criar uma nova tarefa
router.post("/", async (req, res) => {
    return new TaskController(req, res).createTask();
});

// 📌 Rota para atualizar uma tarefa (PATCH)
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updateTask()
});

// 📌 Rota para deletar uma tarefa
router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask()
});

module.exports = router;