import mongoose from "mongoose";

const amountSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        credit: {
            type: Boolean,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Amount = mongoose.model("Amount", amountSchema);