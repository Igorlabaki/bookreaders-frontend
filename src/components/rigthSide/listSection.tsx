import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { IUserBook } from "@/types";
import React from "react";
import SearchBookBarComponent from "../util/searchBookBar";
import FavoriteComponent from "./favoriteItem";

interface listSectionProps {
    text: string;
    title: string;
    children: React.ReactNode;
    sideMode?: "Reading" | "Want to Read" | "Favorite";
}

export default function ListSectionComponent({
    text,
    title,
    sideMode,
    children,
}: listSectionProps) {
    const { authUser } = useRecoverUserData();
    return (
        <div
            className={`flex flex-col gap-y-2 min-h-[630px] min-w-[320px]
            `}
        >
            <p className="flex items-center justify-start w-full font-semibold text-gray-700">
                {authUser?.username.split(" ")[0]}'s {title}
            </p>

            <div className="flex flex-col items-center justify-center w-full gap-y-2">
                <p className="flex items-center justify-start w-full font-semibold text-center text-gray-400">
                    {text}
                </p>
                <SearchBookBarComponent smSize={true} />
            </div>
            {children}
        </div>
    );
}
