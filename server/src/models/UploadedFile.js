const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UploadedFileSchema = new Schema({
    name: { type:String, required: true},
    path: { type:String, required: true},
    thesis: {
        type: Schema.Types.ObjectId,
        ref: 'Thesis',
        required: true
    },
    submitter: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
},{
    timestamps:true
})
const UploadedFile = mongoose.model('UploadedFile', UploadedFileSchema);
module.exports = UploadedFile;