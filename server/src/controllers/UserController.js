const bcrypt = require('bcrypt')
const {User, Student, Faculty, Administrator} = require('../models/User');

const UserController = {
    
    getAll: (req, res) => {
        User.find({})
        .then ((users)=> res.status(200).json(users))
        .catch(() => res.status(404).json('Không tìm thấy danh sách người dùng.'));
    },

    getAllFaculty: (req, res) => {
        Faculty.find({type: 'faculty'})
        .populate('major', 'name')
        .then ((users)=>{
            const facultyList = users.map((user)=> ({
               ...user._doc,
               major: user.major.name
            }))
            res.status(200).json(facultyList)
        })
        .catch(() => res.status(404).json('Không tìm thấy danh sách giảng viên.'));
    },

    getAllStudent: (req, res) => {
        Student.find({type: 'student'})
        .populate('major', 'name')
        .then ((users)=>{
            const studentList = users.map((user)=> ({
                ...user._doc,
                major: user.major.name,
            }))
            res.status(200).json(studentList)
        })
        .catch(() => res.status(404).json('Không tìm thấy danh sách sinh viên.'));
    },

    getStudentByMajor: (req, res) => {
        User.find({type:'student', major: req.params.major}) // tùy vào cách client gửi ntn
        .then ((users) => res.status(200).json(users))
        .catch(() => res.status(404).json('Không tìm thấy danh sách sinh viên.'));
    },

    getFacultyByMajor: (req, res) => {
        User.find({type:'faculty', major: req.params.major}) // tùy vào cách client gửi ntn
        .then ((users) => res.status(200).json(users))
        .catch(() => res.status(404).json('Không tìm thấy danh sách giảng viên.'));
    },
    // getFacultyById: (req, res) => {
    //     User.find({type: 'faculty'})
    //     .then ((users)=> res.status(200).json(users))
    //     .catch(() => res.status(404).json('Không tìm thấy danh sách người dùng.'));
    // },

    getById: (req, res) => {
        User.findOne({_id: req.params.id})
        .then((user) => {
           res.status(200).json(user);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy người dùng.');
        })
    },

    updateProfile: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.params.id})
            console.log('user ne :' ,user);
            const {type} = req.body;                                    
            if (user) { 
                const userUpdated = {
                    ...req.body,
                    password: user._doc.password
                }
                console.log(userUpdated);
                if (type === 'student'){
                    await Student.updateOne({_id: user._id}, userUpdated);
                    return res.status(200).json("Cập nhật user thành công");    //8
                }
                else if (type==='faculty') {                                    // 9
                    await Faculty.updateOne({_id: user._id}, userUpdated)       // 10
                    return res.status(200).json("Cập nhật user thành công");    // 11
                }
            }
            else {
                return res.status(404).json('Không tìm thấy user!')             // 12
            }
        } catch (error) {
            console.log(error);
        }
    },

    create: async (req, res) =>  {
        try {
            let isAdmin = false;                                    // 1
            const {email, type, password} = req.body;               // 2
            const existentUser = await User.findOne({ email });     // 3

            if (!existentUser) {                                        // 4
                const hashPassword = await bcrypt.hash(password, 10);   // 5
                if (type === 'administrator' || type === 'admin') {     // 6
                    isAdmin = true;                                     // 7
                    const admin = await Administrator.create({          // 8
                        ...req.body,
                        type: type,
                        password: hashPassword,
                        isAdmin
                    })
                    return res.status(201).json(admin)                  // 9
                }
                else if (type === 'faculty') {                          // 10
                    const isHeadDep = req.body.headDepartment;          // 11
                    if (isHeadDep === "true") {                         // 12
                        const facultyHead = await Faculty.create({      // 13
                            ...req.body,
                            type: type,
                            password: hashPassword,
                            isHeadDep: true
                        })
                        return res.status(201).json(facultyHead)        // 14
                    }
                    const faculty = await Faculty.create({              // 15
                        ...req.body,
                        type: type,
                        password: hashPassword,
                    })
                    return res.status(201).json(faculty)                // 16
                }
                else if (type === 'student') {                          // 17
                    const student = await Student.create({              // 18
                        ...req.body,
                        type: type,
                        password: hashPassword,
                    })
                    return res.status(201).json(student)                // 19
                }
                else {
                    return res.status(400).json(`Có lỗi trong quá trình tạo user`)  // 20
                }    
            }
            else {
                return res.status(400).json('Email đã tồn tại!')        // 21
            }
        } catch (err) {                                                 // 22              
            return res.status(400).json(`Có lỗi trong quá trình tạo user :  ${err}`)    // 23
        }
    },

    update: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.params.id});      // 1
            const {type} = req.body;                                    // 2
            if (user) {                                                 // 3
                const hashPassword = await bcrypt.hash(req.body.password, 10)   // 4
                const userUpdated = {                                   // 5
                    ...req.body,
                    password: hashPassword,
                }
                if (type === 'student'){                                // 6
                    await Student.updateOne({_id: user._id}, userUpdated);      // 7
                    return res.status(200).json("Cập nhật user thành công");    //8
                }
                else if (type==='faculty') {                                    // 9
                    await Faculty.updateOne({_id: user._id}, userUpdated)       // 10
                    return res.status(200).json("Cập nhật user thành công");    // 11
                }
            }
            else {
                return res.status(404).json('Không tìm thấy user!')             // 12
            }
        } catch (err) {                                                         // 13
            return res.status(400).json(`Có lỗi trong quá trình cập nhật user :  ${err}`)   //14
        }
    },

    lock: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.params.id});          // 1
            if (user) {                                                     // 2
                user.isActived = false;                                     // 3
                const result = await User.updateOne({_id: user._id}, user); // 4
                if (result)                                                 // 5
                    res.status(200).json('Khóa người dùng thành công.');    // 6
                else 
                    res.status(500).json('Có lỗi khi khóa người dùng.');    // 7
            }
            else 
                res.status(404).json('Không tìm thấy người dùng.');         // 8
        } catch (error) {                                                   // 9
            return res.status(500).json(`Có lỗi trong quá trình khóa user :  ${err}`)   // 10
        }
    },

    delete: async (req, res) => {
        try {
            const result = await User.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).json('Không tìm thấy người dùng.');
            }
            else {
                res.status(204).json('Xóa vĩnh viễn người dùng thành công.');
            }
        } catch (error) {
            res.status(500).json('Có lỗi khi xóa người dùng');
        }
    }
}

module.exports = UserController;