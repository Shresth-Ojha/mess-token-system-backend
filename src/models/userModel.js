import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        gID: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        tokenStatus: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema)
