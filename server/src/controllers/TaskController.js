const Task = require('../models/Task');

const TaskController = {
    getAll: (req, res) => {
        Task.find({})
        .then ((tasks)=> res.status(200).json(tasks))
        .catch(() => res.status(404).json('Không tìm thấy danh sách task.'));
    },

    getByThesisId: (req, res) => {
        Task.find({thesis: req.params.id})
        .then((tasks) => {
            res.status(200).json(tasks);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy task.');
        })  
    },

    getById: (req, res) => {
        Task.findOne({_id: req.params.id})
        .then((task) => {
            res.status(200).json(task);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy task.');
        })  
    },

    submitFile: async (req, res) => {
        try {
            const task = await Task.findOne({_id: req.params.id});
            if (task) {
                const taskUpdated = {
                    ...task._doc,
                    status: 'done',
                    files: req.body
                }
                await Task.updateOne({_id: task._id}, taskUpdated)
                return res.status(200).json("Cập nhật task thành công")
            }
            else {
                return res.status(404).json('Không tìm thấy task!')
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình cập nhật task :  ${err}`)
        }
    },


    create: (req, res) => {
        try {
            const task = Task.create({
                ...req.body
            });
            res.status(201).json(task);
        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {
            const task = await Task.findOne({_id: req.params.id});
            if (task) {
                const taskUpdated = {
                    ...req.body
                }
                await Task.updateOne({_id: task._id}, taskUpdated)
                return res.status(200).json("Cập nhật task thành công")
            }
            else {
                return res.status(404).json('Không tìm thấy task!')
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình cập nhật task :  ${err}`)
        }
    },

    delete: async (req, res) => {
        try {
            const result = await Task.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).json('Không tìm thấy luận văn.');
            }
            else {
                res.status(204).json('Xóa vĩnh viễn luận văn thành công.');
            }
        } catch (error) {
            res.status(500).json('Có lỗi khi xóa luận văn');
        }
    }, 

}

module.exports = TaskController