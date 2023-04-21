import React, { useState } from "react";
import moment from "moment";
import { FaUser } from "react-icons/fa";
import CardComponent from "../util/card";
import { IComment, IPost } from "@/types";
import { BsThreeDots } from "react-icons/bs";
import PostHeaderComponent from "./postHeader";
import { AvatarComponent } from "../util/avatar";
import { LikeButtonComponent } from "./likeButton";
import { CommentButtonComponent } from "./commentButton";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import CommentInputComponent from "./commentInput";
import CommentListComponent from "./commentList";

interface PostProps {
    post: IPost;
}

export function PostComponent({ post }: PostProps) {
    const { authUser } = useRecoverUserData();
    const [isEditCommentShow, setIsEditCommentShow] = useState<boolean>(false);
    return (
        <CardComponent>
            <div className="flex flex-col gap-2 px-2">
                <PostHeaderComponent authUser={authUser} post={post} />
                <div className="flex justify-start items-center ml-[80px] gap-x-3  ">
                    <div className="flex justify-center items-center w-[150px] md:min-w-[120px] md:max-w-[120px] gap-x-2 ">
                        <LikeButtonComponent
                            post={post}
                            userId={authUser?.id}
                        />
                        <CommentButtonComponent post={post} />
                    </div>
                    <CommentInputComponent authUser={authUser} post={post} />
                </div>

                <CommentListComponent
                    authUser={authUser}
                    post={post}
                    isEditCommentShow={isEditCommentShow}
                    setIsEditCommentShow={setIsEditCommentShow}
                />
            </div>
        </CardComponent>
    );
}
