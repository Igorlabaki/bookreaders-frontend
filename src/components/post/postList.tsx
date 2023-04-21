import React, { useEffect } from "react";
import { IPost } from "@/types";
import { PostComponent } from ".";
import useGetPostList from "@/hooks/post/useGetPostList";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import queryClient from "@/service/query";

export function PostListComponent() {
    const { authUser } = useRecoverUserData();
    const { getpostList, postList } = useGetPostList();

    useEffect(() => {
        if (authUser) {
            getpostList(authUser?.id);
        }
    }, [authUser]);
    return (
        <div className="mb-10 flex flex-col gap-y-5">
            {postList &&
                postList?.map((post: IPost, index: number) => {
                    return <PostComponent post={post} key={index} />;
                })}
        </div>
    );
}
