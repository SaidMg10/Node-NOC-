import mongoose from 'mongoose';

/* 
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
*/

const logSchema = new mongoose.Schema({

    message: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['low','medium','high'],
        default: 'low',
    },
    origin: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(), 
    },

});


export const LogModel = mongoose.model( 'Log', logSchema );