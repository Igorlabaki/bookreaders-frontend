import { ICreateBookPostParams } from "@/types";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";

interface RatingComponentProps {
    inputCreateBookPost: ICreateBookPostParams;
    setInputCreateBookPost: React.Dispatch<
        React.SetStateAction<ICreateBookPostParams>
    >;
}

export default function RatingComponent({
    inputCreateBookPost,
    setInputCreateBookPost,
}: RatingComponentProps) {
    const [starIndex, setStarIndex] = useState<number>(0);
    const satrIndexList = [1, 2, 3, 4, 5];
    return (
        <div className="flex justify-start items-center gap-x-2">
            <p className="font-light">My rating:</p>
            <div className="flex justify-start items-center gap-x-1">
                {satrIndexList.map((item: number) => {
                    return (
                        <BsStarFill
                            className={`
            ${
                starIndex < item && inputCreateBookPost.rate < item
                    ? "text-gray-300"
                    : "text-yellow-400"
            }
            cursor-pointer
        `}
                            onMouseOver={() => setStarIndex(item)}
                            onMouseOut={() => setStarIndex(0)}
                            onClick={() =>
                                setInputCreateBookPost({
                                    ...inputCreateBookPost,
                                    rate: item,
                                })
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
