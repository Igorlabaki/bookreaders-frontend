import useDeslike from "@/hooks/like/useDeslike";
import useLike from "@/hooks/like/useLike";
import { ILike, IPost } from "@/types";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { ButtonComponent } from "../util/button";

interface LikeButtonComponentPorps {
    post: IPost;
    userId: string | undefined;
}

export function LikeButtonComponent({
    post,
    userId,
}: LikeButtonComponentPorps) {
    const { likeMutate } = useLike();
    const { deslikeMutate } = useDeslike();
    const likesLengthMoreThenZero = post?.Likes?.length > 0;
    const userAlreadyLiked =
        post?.Likes?.filter((like: ILike) => {
            return like.user_id === userId;
        }).length > 0;

    return (
        <div className="flex justify-center items-center gap-[2px]">
            <ButtonComponent
                onClick={() => {
                    if (userAlreadyLiked) {
                        return deslikeMutate({
                            postId: post.id,
                            userId,
                        });
                    }
                    likeMutate({
                        postId: post.id,
                        userId,
                        userNotification: post.user_id,
                    });
                }}
                icon={
                    <AiFillHeart
                        fontSize={19}
                        cursor={"pointer"}
                        className={`
                        ${
                            likesLengthMoreThenZero && userAlreadyLiked
                                ? "text-red-300"
                                : "text-gray-300 hover:text-red-300"
                        }
                        `}
                    />
                }
                className={`cursor-pointer`}
            />
            <p
                className={`
                text-sm font-semibold
                ${
                    likesLengthMoreThenZero && userAlreadyLiked
                        ? "text-red-300"
                        : "text-gray-300"
                }`}
            >
                ({post?.Likes?.length})
            </p>
        </div>
    );
}
