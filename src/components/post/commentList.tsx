import moment from "moment";
import { FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IComment, IPost, IUser } from "@/types";
import { AvatarComponent } from "../util/avatar";

interface CommentListComponentProps {
    post: IPost;
    authUser: IUser | undefined;
    isEditCommentShow: boolean;
    setIsEditCommentShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentListComponent({
    post,
    authUser,
    isEditCommentShow,
    setIsEditCommentShow,
}: CommentListComponentProps) {
    return (
        <div className="flex flex-col justify-start items-center gap-y-2 relative w-[93%] ml-[7%] ">
            {post?.Comments.length > 0 && (
                <IoIosArrowUp
                    size={12}
                    onClick={() => {
                        setIsEditCommentShow(!isEditCommentShow);
                    }}
                    className={`
                    ${
                        !isEditCommentShow
                            ? "rotate-180 duration-500"
                            : "rotate-[360deg] duration-500"
                    }
                    absolute top-[-37px] left-[133px] cursor-pointer text-blue-300`}
                />
            )}
            {isEditCommentShow &&
                post?.Comments.map((comment: IComment) => {
                    return (
                        <div className="flex justify-start items-center w-full gap-x-2">
                            <div className="w-[50px]">
                                <AvatarComponent
                                    avatar={comment?.user?.urlAvatar}
                                    h={"h-[25px] md:h-[45px]"}
                                    w={"w-[25px] md:w-[45px]"}
                                    icon={
                                        <FaUser
                                            size={25}
                                            className={"text-blue-dark"}
                                        />
                                    }
                                />
                            </div>
                            <div className=" text-black font-semibold flex-1  flex flex-col gap-y-1 mt-5">
                                <div className="w-full justify-between items-center flex">
                                    <div className="flex gap-x-2 font-normal justify-start items-center">
                                        <p className="font-semibold">
                                            {comment?.user?.username}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mb-[-3px]">
                                            Posted at{" "}
                                            {moment(
                                                comment?.created_at
                                            ).fromNow()}
                                        </p>
                                    </div>
                                    {authUser?.id === comment?.user?.id && (
                                        <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-full">
                                            <BsThreeDots />
                                        </div>
                                    )}
                                </div>
                                <p className="bg-blue-50 rounded-b-md rounded-tr-md px-2 py-1 font-normal">
                                    {comment?.text}
                                </p>
                            </div>
                            <hr className="text-black" />
                        </div>
                    );
                })}
        </div>
    );
}
