const asyncWrapper = require('../middleware/async');
const Task = require('../models/taskModel');

const getAllTasks = asyncWrapper( async(req, res) => {
        const data = await Task.find({});
        res.status(200).json({data});
   
 })

const createTask =  asyncWrapper(async(req, res) => {  
        const task = await Task.create(req.body);
        res.status(201).json({ task });
})

const getTask = asyncWrapper ( async(req, res) => {
        const {id:taskID} = req.params
        const data = await Task.findOne({_id : taskID});

        if(!data){
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({data});

  
})

const updateTask = asyncWrapper(async (req, res) => {
        const {id:taskID} = req.params;
        const data = await Task.findOneAndUpdate({_id : taskID}, req.body, {
            new:true,
            newValidators:true
        });
        if(!data){
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({data});
     
})

const deleteTask = async (req, res) => {
        const {id:taskID} = req.params;
        const data = await Task.findOneAndDelete({_id: taskID });

        if(!data){
            return res.status(400).json({msg: `No task with ID : ${taskID}`});
         }

        res.status(200).json({data});

}

 module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}