import useCreateBookPost from "@/hooks/post/useCreateBookPost";
import { IBookBd, ICreateBookPostParams, IGoogleBook } from "@/types";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { ButtonComponent } from "../util/button";
import { ImageComponent } from "../util/image";
import RatingComponent from "../util/rating";

interface ReadBookModalProps {
    bookDb?: IBookBd;
    googleBook?: IGoogleBook;
    inputCreateBookPost: ICreateBookPostParams;
    setInputCreateBookPost: React.Dispatch<
        React.SetStateAction<ICreateBookPostParams>
    >;
    setListTypeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReadBookModalComponent({
    bookDb,
    googleBook,
    inputCreateBookPost,
    setInputCreateBookPost,
}: ReadBookModalProps) {
    return (
        <div className="bg-white p-3 rounded-md w-[400px] h-[480px] flex flex-col gap-y-3">
            <div className="flex gap-x-2 justify-start items-start  border-[1px] rounded-md border-gray-200 p-2">
                <ImageComponent
                    alt="Book cover"
                    h={"h-[60px] md:min-h-[100px] md:max-h-[100px]"}
                    w={"w-[60px] md:min-w-[70px] md:max-w-[70px]"}
                    src={
                        googleBook?.volumeInfo?.imageLinks?.thumbnail ||
                        bookDb?.smallThumbnail ||
                        "/images/photos/book-default.jpg"
                    }
                    containerClassname={"rounded-lg overflow-hidden shadow-lg"}
                />
                <div className="flex flex-col justify-start items-start h-full">
                    <p className="text-lg font-semibold">
                        {googleBook?.volumeInfo.title || bookDb?.title}
                    </p>
                    <p>{googleBook?.volumeInfo.subtitle}</p>
                    <p className="italic font-light">
                        by{" "}
                        {googleBook?.volumeInfo?.authors[0] || bookDb?.authors}
                    </p>
                </div>
            </div>
            <RatingComponent
                inputCreateBookPost={inputCreateBookPost}
                setInputCreateBookPost={setInputCreateBookPost}
            />
            <div className="flex flex-col  justify-start items-start">
                <p className="font-light">What did you think?</p>
                <textarea
                    name=""
                    id=""
                    className="bg-gray-200 outline-none w-full h-[200px] p-2"
                    onChange={(e) =>
                        setInputCreateBookPost({
                            ...inputCreateBookPost,
                            text: e.target.value,
                        })
                    }
                ></textarea>
            </div>
            <ButtonComponent
                onClick={() => {
                    console.log(inputCreateBookPost);
                    /*      createBookPostMutate({
                        ...inputCreateBookPost,
                        rate: inputCreateBookPost.rate,
                        text: inputCreateBookPost.text,
                        action: "has read",
                        listType: "Read",
                    });
                    setListTypeModal && setListTypeModal(false); */
                }}
                title="Post"
                className="bg-blue-dark text-white font-semibold py-2 w-full rounded-md peer-hover:brightness-150 shadow-lg"
            />
        </div>
    );
}
