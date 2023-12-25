const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Submissions made to a thesis
// TODO: make it like a storage akin to gdrive
const SubmissionSchema = new Schema({
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
    submitted: {
        type: Date,
        required: true,
        default: Date.now
    },
    attachments: [{
        originalName: String,
        fileData: Buffer,
        fileType: String
    }],
    status: { type: String }
}, 
{
    timestamps: true
});

const Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;
