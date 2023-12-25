const Schedule = require('../models/Schedule');

const ScheduleController = {
    getAll: (req, res) => {
        Schedule.find({})
        .then ((schedules)=> res.status(200).json(schedules))
        .catch(() => res.status(404).json('Không tìm thấy danh sách khoa.'));
    },

    getById: (req, res) => {
        Schedule.findOne({_id: req.params.id})
        .then((schedule) => {
            res.status(200).json(schedule);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy khoa.');
        })  
    },

    create: (req, res) => {
        try {
            const schedule = Schedule.create({
                ...req.body
            });
            res.status(201).json(schedule);
        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {
            const schedule = await Schedule.findOne({_id: req.params.id});
            if (schedule) {
                const scheduleUpdated = {
                    ...req.body
                }
                await Schedule.updateOne({_id: schedule._id}, scheduleUpdated)
                return res.status(200).json("Cập nhật schedule thành công")
            }
            else {
                return res.status(404).json('Không tìm thấy schedule!')
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình cập nhật schedule :  ${err}`)
        }
    },

    delete: async (req, res) => {
        try {
            const result = await Schedule.deleteOne({_id: req.params.id});
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

module.exports = ScheduleController