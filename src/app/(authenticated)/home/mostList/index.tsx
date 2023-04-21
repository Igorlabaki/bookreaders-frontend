import { ImageComponent } from "@/components/util/image";
import { IBookBd, IMostReadBookResponse } from "@/types";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";

interface MostListCompoenntProps {
    list: { book: IBookBd; count: number }[] | undefined;
    isRanking?: boolean;
    isFavorite?: boolean;
}

export default function MostListCompoennt({
    list,
    isRanking,
    isFavorite,
}: MostListCompoenntProps) {
    return (
        <>
            {list?.map(
                (item: { book: IBookBd; count: number }, index: number) => {
                    return (
                        <div className="flex flex-col justify-center items-center relative h-[140px] w-[120px] md:h-[230px] md:w-[150px]">
                            <div className="absolute top-1 left-1 rounded-full flex justify-center items-center h-6 w-6 bg-black/70 text-white p-1 z-20">
                                <p className="text-[11px]">{index + 1}</p>
                            </div>
                            <ImageComponent
                                alt="Book cover"
                                h={"h-full"}
                                w={"w-full"}
                                src={
                                    item.book?.smallThumbnail ||
                                    "/images/photos/book-default.jpg"
                                }
                                onclik={() => {
                                    window.location.href = `/book/byId/${item?.book?.google}`;
                                }}
                                imageClassname={"shadow-lg"}
                                containerClassname={
                                    "rounded-lg overflow-hidden  shadow-lg cursor-pointer"
                                }
                            />
                            <div className="absolute bottom-1 right-1 rounded-full flex justify-center items-center h-8 w-8 bg-black/70 text-white p-1">
                                <div className="text-[11px] flex justify-center items-center gap-x-[3px]">
                                    <p>
                                        {isRanking
                                            ? item.count.toFixed(1)
                                            : item.count}
                                    </p>
                                    <p>
                                        {isRanking ? (
                                            <BsStarFill
                                                className="text-yellow-500"
                                                size={8}
                                            />
                                        ) : isFavorite ? (
                                            <AiFillHeart
                                                className="text-pink-600"
                                                size={10}
                                            />
                                        ) : (
                                            "x"
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                }
            )}
        </>
    );
}
