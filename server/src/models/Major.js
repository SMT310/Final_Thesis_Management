const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MajorSchema = new Schema({
    name: { type: String, required: true },
    head: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true }
}, 
{
    timestamps: true
})
const Major = mongoose.model('Major', MajorSchema);

module.exports = Major;