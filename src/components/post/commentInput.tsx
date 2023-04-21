import { IPost, IUser } from "@/types";
import React, { useState } from "react";
import { AvatarComponent } from "../util/avatar";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { FaUser } from "react-icons/fa";

interface CommentComponentPorps {
    post: IPost;
    authUser: IUser | undefined;
}

export default function CommentInputComponent({
    authUser,
    post,
}: CommentComponentPorps) {
    const { createcommentMutate } = useCreateComment();
    const [commentText, setCommentText] = useState<string>("");

    return (
        <div className="bg-gray-100 flex justify-center only: items-center font-semibold text-gray-500 gap-3 flex-1 rounded-b-md rounded-tr-md px-2 py-1">
            <AvatarComponent
                avatar={authUser?.urlAvatar}
                h={"h-[25px] md:h-[40px]"}
                w={"w-[25px] md:w-[40px]"}
                icon={<FaUser size={25} className={"text-blue-dark"} />}
            />
            <form
                className="flex justify-start items-center w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    createcommentMutate({
                        text: commentText,
                        post_id: post?.id,
                        user_id: authUser?.id,
                        userNotification: post?.user?.id,
                    });
                    setCommentText("");
                }}
            >
                <input
                    type="text"
                    value={commentText}
                    placeholder="Write a comment..."
                    className="bg-transparent w-full  outline-none"
                    onChange={(e) => setCommentText(e.target.value)}
                />
            </form>
        </div>
    );
}
