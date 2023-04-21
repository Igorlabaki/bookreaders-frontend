import { useUpdateBookPage } from "@/hooks/userBook/useUpdateBookPage";
import { useUpdateListType } from "@/hooks/userBook/useUpdateListType";
import { IUserBook } from "@/types";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { ButtonComponent } from "../util/button";
import { ImageComponent } from "../util/image";
import { ModalComponent } from "../util/modal";

interface ProgressPageModalProps {
    setProgressModal: React.Dispatch<React.SetStateAction<boolean>>;
    userBook: IUserBook;
}

export default function ProgressPageModalComponent({
    setProgressModal,
    userBook,
}: ProgressPageModalProps) {
    const [rate, setRate] = useState<number>(0);
    const { updatePageReadMutate } = useUpdateBookPage();
    const { updateListTypeMutate } = useUpdateListType();
    const [pagesNumber, setPagesNumber] = useState(0);
    const [textInput, setTextInput] = useState<string>("");

    const pagesPercentege = (pagesNumber * 100) / userBook?.book?.pageCount;

    let pagesAlreadyRead = (
        (userBook?.pagesRead * 100) /
        userBook?.book?.pageCount
    ).toFixed(0);

    const [starIndex, setStarIndex] = useState<number>(0);
    const satrIndexList = [1, 2, 3, 4, 5];
    return (
        <ModalComponent onClose={() => setProgressModal(false)}>
            <div className="relative pt-2">
                <div className="absolute top-[0.10rem] right-[0.10rem] hover:bg-gray-200 rounded-full">
                    <IoIosClose
                        size={20}
                        className={"text-blue-dark cursor-pointer"}
                        onClick={() => setProgressModal(false)}
                    />
                </div>
                <div className="flex flex-col px-4 pb-5 bg-white gap-y-3">
                    <div className="relative flex gap-x-3">
                        <ImageComponent
                            alt={`${userBook?.book.title} book cover`}
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
                        <div className="flex flex-col gap-y-1">
                            <p className="text-sm font-semibold text-gray-600 w-[90%]">
                                {userBook?.book.title}
                            </p>
                            <p className="text-sm font-light text-gray-600">
                                by {userBook?.book.authors}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-28">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-start gap-x-2">
                                <p className="text-sm font-semibold text-gray-700">
                                    Currrently on page{" "}
                                </p>
                                <input
                                    type="number"
                                    value={pagesNumber || userBook?.pagesRead}
                                    className=" outline-none border-0 bg-gray-100 font-semibold h-8 rounded-md px-3 py-1 w-[120px]"
                                    max={
                                        userBook?.book?.pageCount &&
                                        userBook?.book?.pageCount
                                    }
                                    min={0}
                                    onChange={(e) =>
                                        setPagesNumber(parseInt(e.target.value))
                                    }
                                />
                                <p className="text-sm font-light text-gray-700">
                                    of {userBook?.book?.pageCount}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm font-semibold">
                        {pagesPercentege
                            ? pagesPercentege.toFixed(0)
                            : pagesAlreadyRead}{" "}
                        % done
                    </p>
                    <div className="flex items-center justify-start gap-x-2">
                        <p className="font-light">My rating:</p>
                        <div className="flex items-center justify-start gap-x-1">
                            {satrIndexList.map((item: number) => {
                                return (
                                    <BsStarFill
                                        className={`
                                    ${
                                        starIndex < item && rate < item
                                            ? "text-gray-300"
                                            : "text-yellow-400"
                                    }
                                    cursor-pointer
                                `}
                                        onMouseOver={() => setStarIndex(item)}
                                        onMouseOut={() => setStarIndex(0)}
                                        onClick={() => setRate(item)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className={`w-[90%] overflow-x-hidden rounded-lg  
                bg-gray-100 h-[160px]  py-2
                outline-none  resize-none`}
                    ></textarea>
                    <div className="flex justify-start space-x-4">
                        <ButtonComponent
                            className="bg-blue-dark shadow-lg  py-1 text-sm flex justify-center px-2
                     rounded-md font-semibold hover:brightness-125 text-white w-[200px]  relative cursor-pointer
                     "
                            title="Update Progress"
                            onClick={() => {
                                userBook &&
                                    updatePageReadMutate({
                                        pagesRead: pagesNumber,
                                        userBookId: userBook?.id,
                                        text: textInput,
                                        percentageReadBook: parseInt(
                                            pagesPercentege.toFixed(0)
                                        ),
                                        totalPage: userBook?.book?.pageCount,
                                        rate,
                                    });
                                setProgressModal(false);
                            }}
                        />
                        <ButtonComponent
                            title="I’m finished!"
                            className="bg-green-800 shadow-lg  py-1 text-sm flex justify-center px-2
                    rounded-md font-semibold hover:brightness-125 text-white w-[200px]  relative cursor-pointer
                    "
                            onClick={() => {
                                userBook &&
                                    updateListTypeMutate({
                                        listType: "Read",
                                        userBookId: userBook?.id,
                                        action: "has read",
                                        rate: rate,
                                        text: textInput,
                                    });
                                setProgressModal(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        </ModalComponent>
    );
}
