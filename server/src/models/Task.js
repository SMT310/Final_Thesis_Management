const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    thesis: { 
        type: Schema.Types.ObjectId, 
        ref:'Thesis', 
        required: true 
    },
    description: { type: String },
    startDate: {type: Date, required:true },
    endDate: { type: Date, required: true },
    status: { 
        type: String,
        enum: [
            'pending',
            'done',
            'overdue'
        ],
        default: 'pending'
    },
    files : [
        {
            name: { type:String },
            path: { type:String, required: true},
            submitter: {
                type: Schema.Types.ObjectId,
                ref: 'Student',
            }
        }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true}
}, 
{
    timestamps: true
})
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;