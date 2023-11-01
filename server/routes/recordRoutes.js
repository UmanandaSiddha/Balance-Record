import express from "express";
import { Amount } from "../models/recordModel.js";
import { inital } from "../config.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (!req.body.amount || !req.body.credit || !req.body.desc ) {
            return res.status(400).send({ message : "send data" });
        }

        const newBook = {
            amount: req.body.amount,
            credit: req.body.credit,
            desc: req.body.desc 
        }

        const book = await Amount.create(newBook);
        return res.status(201).send(book);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const amount = await Amount.find({});
        return res.status(201).json({
            count: amount.length,
            data: amount, 
            inital: inital,
        });
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const book = await Amount.findById(req.params.id);
        return res.status(201).json(book);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await Amount.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send({ message: "record not found" });
        }
        return res.status(200).send({ message: "record deleted successfully" });
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;