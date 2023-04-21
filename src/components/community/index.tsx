import queryClient from "@/service/query";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { SearchBarComponent } from "../searchBar";
import CardComponent from "../util/card";
import { SugestedFriendsListComponent } from "./sugestedFriendsList";

export function CommunityComponent() {
    const [search, setSearch] = useState("");
    return (
        <div className="flex flex-col w-full gap-y-5">
            <CardComponent>
                <div className="flex flex-col items-center justify-start gap-y-6">
                    <p className="flex items-center justify-start w-full font-semibold text-gray-700">
                        People you may know
                    </p>
                    <form
                        className="flex w-full bg-white rounded-lg"
                        onSubmit={(e) => {
                            e.preventDefault();

                            setSearch("");
                        }}
                    >
                        <div className="bg-gray-100 rounded-lg flex  w-[100%] m-auto justify-start items-center pl-4 py-2 pr-2 shadow-pattern gap-2 ">
                            <BiSearch className="text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={`Search your friends...`}
                                className="flex-1 font-semibold text-gray-500 bg-gray-100 rounded-tr-lg rounded-br-lg outline-none text-md"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                        </div>
                    </form>
                    <SugestedFriendsListComponent search={search} />
                    <div className="w-full">
                        <hr className={`w-full border-[1px]`} />
                        <div className="flex items-center justify-center w-full font-semibold text-gray-700 cursor-pointer hover:text-blue-dark">
                            <p className="flex items-center justify-center w-full px-3 py-1 duration-500 hover:bg-gray-200 rounded-b-md">
                                See all
                            </p>
                        </div>
                    </div>
                </div>
            </CardComponent>
        </div>
    );
}
