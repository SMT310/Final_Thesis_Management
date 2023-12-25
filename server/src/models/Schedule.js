const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
}, 
{
    timestamps: true
})
const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;