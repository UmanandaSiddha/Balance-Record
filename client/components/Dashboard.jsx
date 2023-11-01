"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Dashboard = () => {
    const [ info, setInfo ] = useState([]);
    const [ initial, setInitial ] = useState(0);
    let sum = 0;

    useEffect(() => {
        axios
            .get("http://localhost:5555/books/")
            .then((res) => {
                setInfo(res.data.data)
                setInitial(res.data.inital)
            })
            .catch((error) => console.log(error))
    }, [])

    for (let i = 0; i < info.length; i++) {
        sum=sum+(info[i].credit? info[i].amount : -info[i].amount)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader className="flex items-center">
                    <CardTitle>Initial Amount : {initial}</CardTitle>
                    <CardDescription>For November</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Balance : {initial - sum}</p>
                </CardContent>
                <CardContent>
                    <p>Per Day : {(initial - sum)/32}</p>
                </CardContent>
            </Card>

            <Card className="w-[400px] my-6">
                <CardHeader className="flex items-center">
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>{info.length} transactions till now</CardDescription>
                </CardHeader>
                {
                    info.map((items, index) => (
                        <Link href={`/details/${items._id}`} key={index}>
                            <CardContent className="grid gap-4">
                                <div className=" flex items-center space-x-4 rounded-md border p-4">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {items.desc}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {items._id}
                                        </p>
                                    </div>
                                    <div className={items.credit? "text-red-500" : "text-green-500"}>
                                        {items.credit? "-"+items.amount : "+"+items.amount}
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                    ))
                }
            </Card>
        </div>
    )
}

export default Dashboard;