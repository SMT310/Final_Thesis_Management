const Major = require('../models/Major');

const MajorController = {
    getAll: (req, res) => {
        Major.find({})
        .then ((majors)=> res.status(200).json(majors))
        .catch(() => res.status(404).json('Không tìm thấy danh sách khoa.'));
    },

    getById: (req, res) => {
        Major.findOne({_id: req.params.id})
        .then((major) => {
            res.status(200).json(major);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy khoa.');
        })  
    },

    create: (req, res) => {
        try {
            const major = Major.create({
                ...req.body
            });
            res.status(201).json(major);
        } catch (error) {
            console.log(error);
        }
    },    

    update: async (req, res) => {
        try {
            const major = await Major.findOne({_id: req.params.id});
            if (major) {
                const majorUpdated = {
                    ...req.body
                }
                await Major.updateOne({_id: major._id}, majorUpdated)
                return res.status(200).json("Cập nhật major thành công")
            }
            else {
                return res.status(404).json('Không tìm thấy major!')
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình cập nhật major :  ${err}`)
        }
    },

    delete: async (req, res) => {
        try {
            const result = await Major.deleteOne({_id: req.params.id});
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

module.exports = MajorController