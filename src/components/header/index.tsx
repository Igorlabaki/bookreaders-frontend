"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ImageComponent } from "../util/image";
import { HeaderMenuComponent } from "./headerMenu";
import { IGoogleBook } from "@/types";
import { FiSearch } from "react-icons/fi";
import CardComponent from "../util/card";
import SearchBookBarComponent from "../util/searchBookBar";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";

export function HeaderCompoenent() {
    const { push } = useRouter();
    const { authUser } = useRecoverUserData();
    return (
        <div
            className="
            flex justify-between items-center w-full px-2 md:px-10 py-5 m-auto 
            fixed top-0 z-30   bg-white shadow-pattern"
        >
            <div className="w-[23%] ">
                <ImageComponent
                    src={"/images/logo/logo-color.png"}
                    alt="logo"
                    w="w-[150px]"
                    h="h-[50px]"
                    onclik={() => push("/")}
                    containerClassname="cursor-pointer"
                />
            </div>
            <div className="hidden md:flex flex-1 justify-center items-center w-full">
                {authUser && <SearchBookBarComponent />}
            </div>
            <div className="w-[23%] flex justify-end ">
                <HeaderMenuComponent />
            </div>
        </div>
    );
}
