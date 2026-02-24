import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successful connection with database with connection host: ', connectionInstance.connection.host);
    } catch (error) {
        console.log('Error in connecting to the database: ', error);
        process.exit(1);
    }
}

export default connectDB;