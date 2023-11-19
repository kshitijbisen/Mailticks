import mongoose from 'mongoose';

const FeedbackSchema = mongoose.Schema({
    mail:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
})

const Feedback = mongoose.model('feedback', FeedbackSchema);

export default Feedback;