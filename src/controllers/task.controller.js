const notFundError = require('../errors/mongodb.errors');
const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    async getAllTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if(!task) {
                return notFundError(this.res)
            }
    
    
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async createTask() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async updateTask() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
    
            const taskToUpdate = await TaskModel.findById(taskId);
            console.log(taskToUpdate)
            console.log(taskData)
            if (!taskToUpdate) {
                return notFundError(this.res)
            }
    
            const allowedUpdate = ["description"]; // Campos permitidos para edição
            const requestedUpdates = Object.keys(taskData); // Campos que o usuário quer atualizar
    
            for (const update of requestedUpdates) {
                if (allowedUpdate.includes(update)) {
                    return this.res.status(400).send(`O campo "${update}" não é editável.`);
                }
                taskToUpdate[update] = taskData[update];
            }
    
            await taskToUpdate.save(); // Salva as mudanças no banco
    
            this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }

    async deleteTask() {
        try {
            const taskId = this.req.params.id;
    
            const taskToDelete = await TaskModel.findById(taskId);
            if (!taskToDelete) {
                return notFundError(this.res)
            }
    
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController