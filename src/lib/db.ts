import mongoose from 'mongoose'

let isConnected = false;

const connectDb = async () => {
    if (isConnected) {
        console.log('Already connected to db');
        return;
    }

    if (!process.env.MONGODB_URL) { 
        throw new Error('Mondodb url env is not defined')
    }

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL, {bufferCommands: false})
        return connect;
    } catch (error) {
        console.log('Error connecting to db', error);
        throw error
    }
}

mongoose.connection.on('connected', () => {
    isConnected = true
    console.log('Connected to DB');
})
mongoose.connection.on('disconnected', () => {
    isConnected = false
    console.log('Disconnected to DB');
})
mongoose.connection.on('error', () => {
    isConnected = false;
    console.log('Mongose connection error');
})

export default connectDb;
