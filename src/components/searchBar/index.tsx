"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { text } from "stream/consumers";
import useGetUserSearchList from "@/hooks/user/useGetUserSearchList";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";

interface SearchBarComponentProps {
    text: string;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchBarComponent({
    text,
    search,
    setSearch,
}: SearchBarComponentProps) {
    const { push } = useRouter();

    return (
        <form
            className="flex w-full bg-white rounded-lg"
            onSubmit={(e) => {
                e.preventDefault();
                push(`/search/list/${search}`);
                setSearch("");
            }}
        >
            <div
                className="
                h-full px-2 py-2 
                rounded-tl-lg rounded-bl-lg 
                bg-blue-dark
                "
            >
                <FiSearch color="#FFFF" size={20} />
            </div>
            <input
                type="text"
                placeholder={`Search ${text}`}
                className="
                    bg-gray-100
                    text-md outline-none
                    px-2 flex-1
                    rounded-tr-lg rounded-br-lg     
                "
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            {/*   {search && searchListModal && !pahtName.includes("list") && 
                <SearchListDropDownMenu onClose={handleCloseSearchListModal}>
                    {handleResultContainer()}
                </SearchListDropDownMenu>
            } 
            */}
        </form>
    );
}
