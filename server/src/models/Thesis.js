const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MAX_AUTHORS = 2;
// The backbone of the thesis management system
const ThesisSchema = new Schema({
  title: { type: String, required: true },                                                    // Title of the thesis
  description: { type: String },
  major: {
    type: Schema.Types.ObjectId,
    ref: 'Major',
    required: true
  },   // Major of the thesis                                              // User-given description of the thesis
  authors: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
    ],
    validate: {
      validator: function (authors) {
        return authors.length <= MAX_AUTHORS;
      },
      message: `Số lượng authors không được vượt quá ${MAX_AUTHORS}.`,
    },
    // ...
  },
  adviser: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
    default: null
  },   // Advisers or supervisors of the thesis
  panelists: {
    type: [Schema.Types.ObjectId],
    ref: 'Faculty',
    required: true,
    default: []
  },  // Panelists assigned to the thesis
  remarks: { type: Number, min:10, max:100},  // Remarks for the thesis in general
  // Status of the thesis
  status: {
    type: String,
    enum: [
      'New',
      'Endorse', // approve
      'Pass',
      'Fail',
    ],
    default: 'New'
  },
  startDate: { type: Date },
  endDate: { type: Date },
  defenseDate: { type: Date },
  approved: { type: Boolean, required: true, default: false }
},
  {
    timestamps: true
  });

const Thesis = mongoose.model('Thesis', ThesisSchema);
module.exports = Thesis;
