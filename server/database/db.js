import mongoose from 'mongoose'
const Connection = () => {
    const DB_URI = 'mongodb://mailticks:mailticks2023@ac-szxdwlv-shard-00-00.nk4rv0b.mongodb.net:27017,ac-szxdwlv-shard-00-01.nk4rv0b.mongodb.net:27017,ac-szxdwlv-shard-00-02.nk4rv0b.mongodb.net:27017/?ssl=true&replicaSet=atlas-x9431c-shard-0&authSource=admin&retryWrites=true&w=majority'
    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true });
        console.log("Database Connection Successfull")
    } catch (error) {
        console.log('Error while connecting with database', error.message);
    }
}
export default Connection;