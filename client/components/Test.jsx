import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import axios from "axios";

export function DetailsRecord() {
    const router = useRouter();
    const [book, setBook] = useState({});
    const id = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5555/books/${id.slug}`)
            .then((res) => {
                setBook(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleDeleteBook = () => {
        axios
            .delete(`http://localhost:5555/books/${id.slug}`)
            .then(() => {
                alert("Successfully Deleted")
            })
            .catch((error) => {
                alert("An unexpected error occured")
                console.log(error);
            });
    }

    return (
        <div className="flex items-center justify-center mt-6">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Record Details</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm font-normal leading-none">Id: {book._id}</p></CardContent>
                <CardContent><p className="text-sm font-normal leading-none">Amount: <span className={book.credit? "text-red-500 font-medium" : "text-green-500 font-medium"}>{book.credit? "-"+book.amount : "+"+book.amount}</span></p></CardContent>
                <CardContent><p className="text-sm font-normal leading-none">Credit: {book.credit? "true" : "false"}</p></CardContent>
                <CardContent><p className="text-sm font-normal leading-none">Description: {book.desc}</p></CardContent>
                <CardContent><p className="text-sm font-normal leading-none">Created At: {new Date(book.createdAt).toString()}</p></CardContent>
                <CardContent><p className="text-sm font-normal leading-none">Last Updated At: {new Date(book.updatedAt).toString()}</p></CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => router.back()}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteBook}>Delete</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
