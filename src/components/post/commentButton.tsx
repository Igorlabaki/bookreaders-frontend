import { IPost } from "@/types";
import React, { useState } from "react";
import { MdModeComment } from "react-icons/md";
import { ButtonComponent } from "../util/button";

interface CommentButtonComponentProps {
    post: IPost;
}

export function CommentButtonComponent({ post }: CommentButtonComponentProps) {
    return (
        <div className="flex justify-center items-center gap-1">
            <ButtonComponent
                icon={
                    <MdModeComment
                        fontSize={19}
                        cursor={"pointer"}
                        className={`
                        ${
                            post?.Comments?.length > 0
                                ? `text-blue-300`
                                : "text-gray-300"
                        }
                        `}
                    />
                }
                className={``}
            />
            <p
                className={`
                text-sm font-semibold
                ${
                    post?.Comments?.length > 0
                        ? "text-blue-300"
                        : "text-gray-300"
                }`}
            >
                ({post?.Comments?.length | 0})
            </p>
        </div>
    );
}
