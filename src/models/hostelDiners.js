import mongoose from 'mongoose';

const hostelDinersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uniqueiitdid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    tokenStatus: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

export const hostelDinersModel = mongoose.model("Hostel-Diners", hostelDinersSchema)
