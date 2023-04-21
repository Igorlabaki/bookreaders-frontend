import React, { useEffect, useState } from "react";
import FriendComponent from "./friend";
import { IFollow, IFollowParams, IUser } from "@/types";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import useGetUserSearchList from "@/hooks/user/useGetUserSearchList";
import useGetUserList from "@/hooks/user/useGetUserList";

interface SugestedFriendsListComponentProps {
    search: string;
}

export function SugestedFriendsListComponent({
    search,
}: SugestedFriendsListComponentProps) {
    const { authUser } = useRecoverUserData();
    const { userList, useGetUserListMutate } = useGetUserList();

    useEffect(() => {
        if (authUser) {
            useGetUserListMutate({ userId: authUser?.id, search: search });
        }
    }, [authUser]);
    return (
        <div className="grid grid-cols-2 justify-start items-center w-full gap-x-5 gap-y-2 px-5 md:px-0 overflow-hidden">
            {userList?.map((user: IUser, index: number) => {
                if (!user?.username.includes(search)) {
                    return;
                }
                if (user?.username.includes("Erika")) {
                    return;
                }
                return <FriendComponent key={user.id} user={user} />;
            })}
        </div>
    );
}
