import { IUser } from "@/types";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { AvatarComponent } from "../util/avatar";
import { FollowButtonComponent } from "../util/followButton";

interface FriendsProps {
    user: IUser;
}

export default function FriendComponent({ user }: FriendsProps) {
    const [isMouseOverCard, setIsMouseOverCard] = useState<boolean>(false);

    return (
        <div
            className="flex flex-col justify-center items-center relative
            bg-gray-100 py-2 gap-y-2 min-w-[120px]  px-1 rounded-md hover:bg-gray-200 
                duration-200 cursor-pointer"
            key={user?.id}
            onMouseOver={() => setIsMouseOverCard(() => true)}
            onMouseOut={() => setIsMouseOverCard(() => false)}
        >
            <div
                className="flex flex-col justify-center items-center gap-y-2"
                onClick={() => (window.location.href = `/profile/${user?.id}`)}
            >
                {isMouseOverCard && (
                    <IoIosClose
                        className="absolute top-1 right-1 hover:bg-gray-300 
                    rounded-full flex justify-center items-center"
                    />
                )}
                <AvatarComponent
                    avatar={user?.urlAvatar}
                    h={"h-[60px] md:h-[80px]"}
                    w={"w-[60px] md:w-[80px]"}
                    icon={<FaUser size={25} className={"text-blue-dark"} />}
                />
                <p className="text-sm md:text-md font-semibold text-center">
                    {user?.username}
                </p>
            </div>
            <FollowButtonComponent user={user} />
        </div>
    );
}
