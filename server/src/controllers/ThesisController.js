const Thesis = require("../models/Thesis");
const { User } = require("../models/User");


const ThesisController = {
  registerThesis: async (req, res) => {
    const user = await User.findOne({ _id: req.params.lecturerId });
    if (user) {
      if (user.type === 'faculty') {
        let data = {
          ...req.body,
          status: "New",
        }
        if (user.isHeadDep) {
          data = {
            ...req.body,
            status: "Endorse",
            approved: true,
          }
        }
        const thesis = await Thesis.create(data);
        if (thesis) {
          res.status(201).json(thesis)
        }
        else {
          res.status(400).json('Có lỗi khi đăng kí thesis');
        }
      }
    }
    else {
      res.status(404).json('Không tìm thấy user');
    }

  },
  registerThesisForStudent: async (req, res) => {
    try {
      const thesis = await Thesis.findOne({ _id: req.params.id });
      if (thesis) {
        if (thesis?._doc.authors.length < 2) {
          const thesisUpdated = {
            ...thesis._doc,
            authors: [...thesis._doc.authors, req.body._id],
          };
          await Thesis.updateOne({ _id: thesis._id }, thesisUpdated);
          return res.status(200).json("Cập nhật thesis thành công");
        }
        else {
          return res
            .status(400)
            .json(`Có lỗi trong quá trình cập nhật thesis :  ${err}`);
        }
      } else {
        return res.status(404).json("Không tìm thấy thesis!");
      }
    } catch (err) {
      return res
        .status(400)
        .json(`Có lỗi trong quá trình cập nhật thesis :  ${err}`);
    }
  },

  approveThesis: async (req, res) => {
    try {
      const thesis = await Thesis.findOne({ _id: req.params.id });
      if (thesis) {
        const thesisUpdated = {
          ...thesis._doc,
          status: "Endorse",
          approved: true,
        };
        await Thesis.updateOne({ _id: thesis._id }, thesisUpdated);
        return res.status(200).json("Cập nhật thesis thành công");
      } else {
        return res.status(404).json("Không tìm thấy thesis!");
      }
    } catch (err) {
      return res
        .status(400)
        .json(`Có lỗi trong quá trình cập nhật thesis :  ${err}`);
    }
  },

  denyThesis: async (req, res) => {
    try {
      const thesis = await Thesis.findOne({ _id: req.params.id });
      if (thesis) {
        const thesisUpdated = {
          ...thesis._doc,
          status: "Fail",
          approved: false,
        };
        await Thesis.updateOne({ _id: thesis._id }, thesisUpdated);
        return res.status(200).json("Cập nhật thesis thành công");
      } else {
        return res.status(404).json("Không tìm thấy thesis!");
      }
    } catch (err) {
      return res
        .status(400)
        .json(`Có lỗi trong quá trình cập nhật thesis :  ${err}`);
    }
  },

  getByFacultyId: (req, res) => {
    Thesis.find({ adviser: req.params.adviserId })
      .populate("authors", "firstName lastName")
      .populate("major", "name")
      .populate("adviser", "firstName lastName")
      .populate("panelists", "firstName lastName")
      .then((theses) => {
        res.status(200).json(theses);
      })
      .catch(() => {
        res.status(404).json("Không tìm thấy luận văn.");
      });
  },

  getByStudentId: (req, res) => {
    const thesisList = [];
    Thesis.find({})
      .populate("authors", "firstName lastName")
      .populate("major", "name")
      .populate("adviser", "firstName lastName")
      .populate("panelists", "firstName lastName")
      .then((theses) => {
        theses.map((thesis) => {
          const authorIds = thesis.authors.map((author) =>
            author._id.toString()
          );
          if (authorIds.includes(req.params.studentId)) thesisList.push(thesis);
        });
        res.status(200).json(thesisList);
      })
      .catch(() => {
        res.status(404).json("Không tìm thấy luận văn.");
      });
  },

  assignDefenseMember: async (req, res) => {
    try {
      const thesis = await Thesis.findOne({ _id: req.params.id });
      if (thesis) {
        const panelists = req.body.panelists;
        const thesisUpdated = {
          ...thesis._doc,
          panelists: panelists,
          defenseDate: req.body.defenDate
        };

        await Thesis.updateOne({ _id: thesis._id }, thesisUpdated);
        return res.status(200).json("Cập nhật thesis thành công");
      } else {
        return res.status(404).json("Không tìm thấy thesis!");
      }
    } catch (err) {
      return res
        .status(400)
        .json(`Có lỗi trong quá trình cập nhật thesis :  ${err}`);
    }
  },

  getAllPendingThesis: (req, res) => {
    Thesis.find({ status: "New", approved: false, major: req.params.major })
      .populate("authors", "firstName lastName")
      .populate("major", "name")
      .populate("adviser", "firstName lastName")
      .populate("panelists", "firstName lastName")
      .then((theses) => res.status(200).json(theses))
      .catch(() => res.status(404).json("Không tìm thấy danh sách luận văn."));
  },

  getAllApprovalThesis: (req, res) => {
    Thesis.find({ approved: true, major: req.params.major })
      .populate("authors", "firstName lastName")
      .populate("major", "name")
      .populate("adviser", "firstName lastName")
      .populate("panelists", "firstName lastName")
      .then((theses) => res.status(200).json(theses))
      .catch(() => res.status(404).json("Không tìm thấy danh sách luận văn."));
  },

  getAll: (req, res) => {
    Thesis.find({})
      .populate("authors", "firstName lastName")
      .populate("major", "name")
      .populate("adviser", "firstName lastName")
      .populate("panelists", "firstName lastName")
      .then((theses) => res.status(200).json(theses))
      .catch(() => res.status(404).json("Không tìm thấy danh sách luận văn."));
  },

  getAllDone: (req, res) => {
    Thesis.find({ status: 'Pass' })
      .populate("authors", "firstName lastName")
      .populate("major", "name")
      .populate("adviser", "firstName lastName")
      .populate("panelists", "firstName lastName")
      .then((theses) => res.status(200).json(theses))
      .catch(() => res.status(404).json("Không tìm thấy danh sách luận văn."));
  },

  getById: (req, res) => {
    Thesis.findOne({ _id: req.params.id })
      .populate("authors", "firstName lastName")
      .populate("major", "name")
      .populate("adviser", "firstName lastName")
      .populate("panelists", "firstName lastName")
      .then((thesis) => {
        res.status(200).json(thesis);
      })
      .catch(() => {
        res.status(404).json("Không tìm thấy luận văn.");
      });
  },

  create: async (req, res) => {
    try {
      const thesis = await Thesis.create({
        ...req.body,
      });
      res.status(201).json(thesis);
    } catch (err) {
      return res
        .status(400)
        .json(`Có lỗi trong quá trình tạo thesis :  ${err}`);
    }
  },

  update: async (req, res) => {
    try {
      const thesis = await Thesis.findOne({ _id: req.params.id });
      if (thesis) {
        const thesisUpdated = {
          ...req.body,
        };
        await Thesis.updateOne({ _id: thesis._id }, thesisUpdated);
        return res.status(200).json("Cập nhật thesis thành công");
      } else {
        return res.status(404).json("Không tìm thấy thesis!");
      }
    } catch (err) {
      return res
        .status(400)
        .json(`Có lỗi trong quá trình cập nhật thesis :  ${err}`);
    }
  },

  delete: async (req, res) => {
    try {
      const result = await Thesis.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        res.status(404).json("Không tìm thấy luận văn.");
      } else {
        res.status(204).json("Xóa vĩnh viễn luận văn thành công.");
      }
    } catch (error) {
      res.status(500).json("Có lỗi khi xóa luận văn");
    }
  },

  register: async (req, res) => { },
};

module.exports = ThesisController;
