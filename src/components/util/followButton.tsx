import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { useFollowUser } from "@/hooks/user/useFollowUser";
import { useUnfollowUser } from "@/hooks/user/useUnfollowUser";
import { IFollow, IFollowParams, IUser } from "@/types";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ButtonComponent } from "./button";

interface FollowButtonComponentProps {
    user: IUser;
}

export function FollowButtonComponent({ user }: FollowButtonComponentProps) {
    const pathName = usePathname();
    const { authUser } = useRecoverUserData();
    const { userFollowMutate } = useFollowUser();
    const { useUnfollowMutate } = useUnfollowUser();
    const [isMouseOverButton, setIsMouseOverButton] = useState<boolean>(false);

    const followParams: IFollowParams = {
        followerId: authUser?.id,
        followingId: user?.id,
    };

    const following = !!authUser?.following.find((follow: IFollow) => {
        return follow.followingId === user?.id;
    });

    const followedBy = !!authUser?.followedBy.find((follow: IFollow) => {
        return follow.followerId === user?.id;
    });

    function handleFollowUnfollowUser() {
        if (following) {
            return useUnfollowMutate(followParams);
        }

        userFollowMutate(followParams);
    }

    return (
        <ButtonComponent
            title={`${
                following && isMouseOverButton
                    ? "Unfollow"
                    : following
                    ? "Following"
                    : followedBy
                    ? "Follow back"
                    : "Follow"
            }`}
            onMouseOver={() => setIsMouseOverButton(() => true)}
            onMouseOut={() => setIsMouseOverButton(() => false)}
            className={`
            ${pathName.includes("profile") ? "w-[100px]" : " w-full"}
            text-[16px]
            bg-blue-dark shadow-lg  py-1 flex justify-center px-2
            rounded-md font-semibold hover:brightness-125    relative cursor-pointer
            "
    ${
        following && isMouseOverButton
            ? "bg-red-300 text-red-900"
            : following
            ? "bg-transparent border-2 border-blue-dark  text-blue-dark font-bold"
            : "text-white"
    }
    `}
            onClick={() => handleFollowUnfollowUser()}
        />
    );
}
