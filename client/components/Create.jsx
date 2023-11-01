"use client";

import React, { useState } from 'react';
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";

const CreateTransaction = () => {
    const [amount, setAmount] = useState(0);
    const [credit, setCredit] = useState(true);
    const [desc, setDesc] = useState("");

    const handleSaveBook = () => {
        const data = {
            amount,
            credit,
            desc,
        };
        axios
            .post("https://balance-record.vercel.app/books/", data)
            .then(() => {
                alert("Success")
            })
            .catch((error) => {
                alert("An unexpected error occured")
                console.log(error);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center m-6">
            <div className="grid w-full max-w-sm items-center my-2 gap-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input type="number" placeholder="Amount" value={amount} onChange={(e => setAmount(e.target.value))} />
            </div>
            <div className="grid w-full max-w-sm items-center my-2 gap-1.5">
                <Label htmlFor="credit">Credit</Label>
                <Input type="boolean" placeholder="Credit" value={credit} onChange={(e => setCredit(e.target.value))} />
            </div>
            <div className="grid w-full max-w-sm items-center my-2 gap-1.5">
                <Label htmlFor="description">Description</Label>  
                <Input type="text" placeholder="Description" value={desc} onChange={(e => setDesc(e.target.value))} />
            </div>
            <Button className="my-6" onClick={handleSaveBook}>Save Data</Button>
        </div>
    )
}

export default CreateTransaction;