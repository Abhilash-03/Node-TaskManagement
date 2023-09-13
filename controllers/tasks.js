const Task = require('../models/taskModel');

const getAllTasks = async(req, res) => {
    try{
        const data = await Task.find({});
        res.status(200).json({data});
    }
    catch(err){
        res.status(500).json({msg: err});
    }
 }

const createTask =  async(req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    }
    catch(err){
        res.status(500).json({msg: err});
    }
   
}
const getTask =  async(req, res) => {
    try{
        const {id:taskID} = req.params
        const data = await Task.findOne({_id : taskID});

        if(!data){
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({data});

    }catch(err){
        res.status(500).json({msg:err});
    }
   
}
const updateTask = async (req, res) => {
    try{
        const {id:taskID} = req.params;
        const data = await Task.findOneAndUpdate({_id : taskID}, req.body, {
            new:true,
            newValidators:true
        });
        if(!data){
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({data});
    }
    catch(err){
        res.status(500).json({msg: err});
    }
  
}
const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const data = await Task.findOneAndDelete({_id: taskID });

        if(!data){
            return res.status(400).json({msg: `No task with ID : ${taskID}`});
         }

        res.status(200).json({data});
        
    } catch (err) {
        res.status(500).json({msg: err});
    }
}



 module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}