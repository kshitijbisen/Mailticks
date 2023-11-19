import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    color: {
        type: String,
        required: true,
    }
})

const Category = mongoose.model('category', CategorySchema);

export default Category;