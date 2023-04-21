import React, { useState } from "react";
import moment from "moment";
import { IPost, IUser, IUserBook } from "@/types";
import { FaUser } from "react-icons/fa";
import { BsStarFill, BsThreeDots } from "react-icons/bs";
import { AvatarComponent } from "../util/avatar";
import { useRouter } from "next/navigation";
import { ImageComponent } from "../util/image";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { ModalComponent } from "../util/modal";
import ProgressBarComponent from "../util/progressBar";

interface PostHeaderComponentProps {
    post: IPost;
    authUser: IUser | undefined;
}

export default function PostHeaderComponent({
    authUser,
    post,
}: PostHeaderComponentProps) {
    function handleMenuPost() {
        if (authUser?.id === post?.user_id) {
            return (
                <div className="relative p-1 rounded-full cursor-pointer hover:bg-gray-100">
                    <BsThreeDots />
                </div>
            );
        }
    }
    const satrIndexList = [1, 2, 3, 4, 5];
    return (
        <div className="flex items-start justify-start gap-4">
            <div className="md:w-[60px]">
                <AvatarComponent
                    avatar={post?.user?.urlAvatar}
                    h={"h-[50px] md:h-[60px]"}
                    w={"w-[50px] md:w-[60px]"}
                    icon={<FaUser size={25} className={"text-blue-dark"} />}
                    onClick={() =>
                        (window.location.href = `/profile/${post?.user_id}`)
                    }
                />
            </div>
            <div className="flex flex-col w-full gap-y-2">
                <div className="flex flex-col ">
                    <div className="flex justify-between w-full posts-center">
                        <div className="flex items-center justify-center cursor-pointer gap-x-3">
                            <p
                                className="text-sm font-semibold md:text-lg hover:underline "
                                onClick={() =>
                                    (window.location.href = `/profile/${post?.user_id}`)
                                }
                            >
                                {post?.user?.username}
                            </p>
                            <p className="text-sm  italic  mt-[1px] ">
                                {post?.action}
                            </p>
                            {post?.challengeGoal && (
                                <div className="font-semibold text-gray-700">
                                    <p>
                                        {post?.challengeGoal} books this year!
                                    </p>
                                </div>
                            )}

                            {post?.userProfile && (
                                <div
                                    className="flex items-center justify-center cursor-pointer gap-x-3"
                                    onClick={() =>
                                        (window.location.href = `/profile/${post?.userProfile.id}`)
                                    }
                                >
                                    <p className="text-sm font-semibold duration-200 md:text-lg hover:underline">
                                        {post?.userProfile?.username}
                                    </p>
                                </div>
                            )}
                        </div>
                        {handleMenuPost()}
                    </div>
                    <p className="text-sm  md:text-[12px] text-gray-400">
                        Posted at {moment(post?.created_at).fromNow()}
                    </p>
                </div>
                {post?.book && (
                    <div className="flex flex-col items-start justify-start md:flex-row gap-x-3 ">
                        <ImageComponent
                            alt={`${post?.book?.title} book cover`}
                            h={"h-[200px] md:min-h-[180px] md:max-h-[180px]"}
                            w={"w-[150px] md:min-w-[120px] md:max-w-[120px]"}
                            src={
                                post?.book?.smallThumbnail ||
                                "/images/photos/book-default.jpg"
                            }
                            containerClassname={
                                "rounded-lg overflow-hidden cursor-pointer shadow-lg"
                            }
                            onclik={() => {
                                window.location.href = `/book/byId/${post?.book?.google}`;
                            }}
                        />

                        <div className="flex flex-col justify-between w-full  gap-y-2  h-[200px] md:min-h-[180px] md:max-h-[180px]">
                            <div>
                                <p className="text-sm font-semibold md:text-lg">
                                    {post?.book?.title}
                                </p>
                                <p className="text-sm italic font-semibold md:text-lg">
                                    by {post?.book?.authors}
                                </p>
                                <p className="hidden mt-2 md:flex">
                                    {post?.book?.description
                                        ?.slice(0, 150)
                                        .replace("<p>", "")}
                                    ...
                                </p>
                                {post.action === "made progress on" &&
                                    post?.percentageReadBook && (
                                        <div className="flex items-start justify-start space-x-3">
                                            <ProgressBarComponent
                                                percentegeCompleted={
                                                    post?.percentageReadBook
                                                }
                                            />
                                            <p className="text-sm text-gray-500">
                                                (on page {post?.pagesRead} of{" "}
                                                {post?.totalPage})
                                            </p>
                                        </div>
                                    )}
                                {post?.bookRate && post?.bookRate > 0 && (
                                    <div className="flex items-center justify-start gap-x-1">
                                        {satrIndexList.map((item: number) => {
                                            return (
                                                <BsStarFill
                                                    className={`
                                                ${
                                                    post?.bookRate &&
                                                    post?.bookRate < item
                                                        ? "text-gray-300"
                                                        : "text-yellow-400"
                                                }
                                            `}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            {post?.text && (
                                <p className="w-full p-2 font-semibold bg-blue-50 rounded-b-md rounded-tr-md ">
                                    {post?.text}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                {post?.text && !post?.book && (
                    <p className="w-full p-2 font-semibold  bg-blue-50 rounded-b-md rounded-tr-md">
                        {post?.text}
                    </p>
                )}
            </div>
        </div>
    );
}
