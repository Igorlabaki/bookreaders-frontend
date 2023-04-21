import useUserBookDelete from "@/hooks/userBook/userBookDelete";
import { useUpdateBookPage } from "@/hooks/userBook/useUpdateBookPage";
import { useUpdateListType } from "@/hooks/userBook/useUpdateListType";
import { IUserBook } from "@/types";
import React, { useState, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { ButtonComponent } from "../util/button";
import { ImageComponent } from "../util/image";
import { ModalComponent } from "../util/modal";
import ProgressBarComponent from "../util/progressBar";
import RatingComponent from "../util/rating";

interface CurrentlyReadingPorps {
    userBook: IUserBook;
}

export default function WantToReadComponent({
    userBook,
}: CurrentlyReadingPorps) {
    const { userBookDeleteMutate } = useUserBookDelete();

    const [hoverRedingCardIsTrue, setHoverRedingCardIsTrue] =
        useState<boolean>(false);

    const { updateListTypeMutate } = useUpdateListType();

    return (
        <div
            className="flex gap-x-3 rounded-md relative"
            onMouseOver={() => setHoverRedingCardIsTrue(true)}
            onMouseOut={() => setHoverRedingCardIsTrue(false)}
        >
            {hoverRedingCardIsTrue && (
                <div className="absolute top-2 right-2 hover:bg-gray-200 rounded-md p-1">
                    <BiTrashAlt
                        size={13}
                        className={`cursor-pointer  rounded-full text-gray-600 
                                `}
                        onClick={() => userBookDeleteMutate(userBook?.id)}
                    />
                </div>
            )}
            <ImageComponent
                alt={`${userBook?.book.title} book cover `}
                h={"h-[200px] md:min-h-[150px] md:max-h-[150px]"}
                w={"w-[150px] md:min-w-[100px] md:max-w-[100px]"}
                src={
                    userBook?.book?.smallThumbnail ||
                    "/images/photos/book-default.jpg"
                }
                containerClassname={
                    "rounded-lg overflow-hidden cursor-pointer shadow-lg"
                }
                onclik={() => {
                    window.location.href = `/book/byId/${userBook?.book?.google}`;
                }}
            />
            <div className="flex flex-col h-[150px] justify-between">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold  w-[80%]">
                        {userBook?.book.title}
                    </p>
                    <p className="text-sm font-light italic">
                        by {userBook?.book?.authors}
                    </p>
                </div>
                <div className="flex flex-col gap-y-3">
                    <ButtonComponent
                        title="Start  read"
                        className="bg-blue-dark py-1 text-sm flex justify-center px-2 shadow-pattern hover:shadow-none
                    rounded-md font-semibold hover:brightness-125 text-white w-[150px]  relative cursor-pointer"
                        onClick={() =>
                            updateListTypeMutate({
                                listType: "Reading",
                                userBookId: userBook?.id,
                                action: "start to read",
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
}
