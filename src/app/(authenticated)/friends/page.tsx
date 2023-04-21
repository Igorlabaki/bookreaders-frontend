"use client";
import React, { useState } from "react";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { IFollow, IUser } from "@/types";
import { AvatarComponent } from "@/components/util/avatar";
import { FaUser } from "react-icons/fa";
import CardComponent from "@/components/util/card";
import FriendComponent from "@/components/community/friend";
import { BiSearch } from "react-icons/bi";

export default function page() {
    const { authUser } = useRecoverUserData();
    const [searchFollowing, setSearchFollowing] = useState<string>("");
    const [searchFollowedBy, setSearchFollowedBy] = useState<string>("");

    return (
        <CardComponent>
            <div className="flex flex-col gap-y-2 space-y-3 justify-start items-start w-full">
                <p className="text-lg font-bold text-blue-dark">Followed by</p>
                <div className="flex flex-col justify-center items-center gap-y-2 w-full">
                    <div className="bg-gray-100 rounded-lg flex w-[100%] m-auto justify-start items-center pl-4 py-2 pr-2 shadow-pattern gap-2  z-50">
                        <BiSearch className="text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={`Search your book`}
                            className={` bg-transparent
                    font-semibold text-gray-500
                    text-md outline-none 
                    flex-1   
                    `}
                            onChange={(e) => {
                                setSearchFollowedBy(() => e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2 justify-start w-full">
                        {authUser?.followedBy?.map((followedBy: IFollow) => {
                            if (
                                !followedBy?.follower?.username
                                    ?.toLocaleLowerCase()
                                    .startsWith(
                                        searchFollowedBy.toLocaleLowerCase()
                                    )
                            ) {
                                return;
                            }
                            return (
                                <FriendComponent user={followedBy?.follower} />
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-3 justify-start items-start w-full mt-3">
                <p className="text-lg font-bold text-blue-dark">Following</p>
                <div className="flex flex-col justify-center items-center gap-y-2 w-full">
                    <div className="bg-gray-100 rounded-lg flex w-[100%] m-auto justify-start items-center pl-4 py-2 pr-2 shadow-pattern gap-2  z-50">
                        <BiSearch className="text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={`Search your book`}
                            className={` bg-transparent
                    font-semibold text-gray-500
                    text-md outline-none 
                    flex-1   
                    `}
                            onChange={(e) => {
                                setSearchFollowing(() => e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2 justify-start w-full">
                        {authUser?.following?.map((followedBy: IFollow) => {
                            if (
                                !followedBy?.following?.username
                                    ?.toLocaleLowerCase()
                                    .startsWith(
                                        searchFollowing.toLocaleLowerCase()
                                    )
                            ) {
                                return;
                            }
                            return (
                                <FriendComponent user={followedBy?.following} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </CardComponent>
    );
}
