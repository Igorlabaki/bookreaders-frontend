"use client";
import CardComponent from "@/components/util/card";
import { ImageComponent } from "@/components/util/image";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import useSearchGoogleBooks from "@/hooks/googleBooks/useSearchGoogleBooks";
import { IGoogleBook, IUserBook } from "@/types";
import React from "react";

export default function BooksPage() {
    const { authUser } = useRecoverUserData();
    const numberOfBooksRead = authUser?.books?.filter((book: IUserBook) => {
        if (book.listType === "Read") {
            return true;
        } else {
            return false;
        }
    });
    const { googleSearchMutate, googleSearch } = useSearchGoogleBooks();
    return (
        <div>
            <div>
                <p>Read Books</p>
                <p>{numberOfBooksRead?.length}</p>
            </div>
        </div>
    );
}
