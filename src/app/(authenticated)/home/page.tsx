"use client";
import { useEffect, useState } from "react";
import FeedComponent from "@/components/Feed";
import { CommunityComponent } from "@/components/community";
import queryClient from "@/service/query";
import CardComponent from "@/components/util/card";
import { SearchBarComponent } from "@/components/searchBar";
import { BiHomeAlt, BiUser } from "react-icons/bi";
import useSearchGoogleBooks from "@/hooks/googleBooks/useSearchGoogleBooks";
import { IBookBd, IGoogleBook } from "@/types";
import { ImageComponent } from "@/components/util/image";
import { useGetMostReadList } from "@/hooks/books/getMostReadList";
import { useGetMostPostedBookList } from "@/hooks/post/getMostPostedBookList";
import MostListCompoennt from "./mostList";
import useGetRankingBookList from "@/hooks/userBook/useGetRankingBookList";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import useGetPostList from "@/hooks/post/useGetPostList";
import { usePathname } from "next/navigation";
import { useGetMostFavoriteList } from "@/hooks/books/getMostFavoriteList";
import { IoIosArrowUp } from "react-icons/io";

export default function HomePage() {
    const [listType, setListType] = useState<
        "Most Read" | "Most Favorite" | "Rating Rank" | "Most Posted"
    >("Most Read");
    const { mostReadList } = useGetMostReadList();
    const { mostFavoriteList } = useGetMostFavoriteList();
    const { rankingBookList } = useGetRankingBookList();
    const { mostPostedList } = useGetMostPostedBookList();
    const [isMinimize, setIsMinimize] = useState<boolean>(true);

    return (
        <div className="flex flex-col space-y-5  z-60 relative">
            <CardComponent>
                <div className="flex flex-col justify-between w-[90%]  m-auto text-gray-500 font-semibold">
                    <div
                        className={`
                    
                    flex w-full  justify-center items-center space-x-16   m-auto text-sm md:text-lg`}
                    >
                        <p
                            className={`cursor-pointer px-3 py-3 ${
                                listType.includes("Rating Rank") && !isMinimize
                                    ? "text-blue-600 border-b-2 border-blue-600 scale"
                                    : "hover:bg-gray-200 rounded-md "
                            }`}
                            onClick={() => {
                                setListType(() => "Rating Rank");
                                setIsMinimize(false);
                            }}
                        >
                            Best Rated
                        </p>
                        <p
                            className={`cursor-pointer px-3 py-3 ${
                                listType.includes("Most Read") && !isMinimize
                                    ? "text-blue-600 border-b-2 border-blue-600 scale"
                                    : "hover:bg-gray-200 rounded-md "
                            }`}
                            onClick={() => {
                                setListType(() => "Most Read");
                                setIsMinimize(false);
                            }}
                        >
                            Most Read
                        </p>
                        <p
                            className={`cursor-pointer px-3 py-3 ${
                                listType.includes("Most Posted") && !isMinimize
                                    ? "text-blue-600 border-b-2 border-blue-600 scale"
                                    : "hover:bg-gray-200 rounded-md "
                            }`}
                            onClick={() => {
                                setListType(() => "Most Posted");
                                setIsMinimize(false);
                            }}
                        >
                            Most Listed
                        </p>
                        <p
                            className={`cursor-pointer px-3 py-3 ${
                                listType.includes("Most Favorite") &&
                                !isMinimize
                                    ? "text-blue-600 border-b-2 border-blue-600 scale"
                                    : "hover:bg-gray-200 rounded-md "
                            }`}
                            onClick={() => {
                                setListType(() => "Most Favorite");
                                setIsMinimize(false);
                            }}
                        >
                            Most Favorite
                        </p>
                        <IoIosArrowUp
                            size={15}
                            onClick={() => {
                                setIsMinimize(!isMinimize);
                            }}
                            className={`absolute mt-1 cursor-pointer top-2 right-4 text-blue-dark
                    ${
                        !isMinimize
                            ? "rotate-180 duration-500"
                            : "rotate-[360deg] duration-500"
                    }`}
                        />
                    </div>
                    <div
                        className={`overflow-hidden
                    ${isMinimize ? "h-0" : "h-[260px]"} duration-[450ms]`}
                    >
                        <div
                            className={`
                    ${
                        isMinimize ? "translate-y-[-1000px]" : "translate-y-0"
                    }  duration-[450ms] flex justify-center items-center gap-x-2  md:gap-x-10 pt-4 mt-3   md:p-4 w-full`}
                        >
                            {listType === "Most Read" && (
                                <MostListCompoennt list={mostReadList} />
                            )}
                            {listType === "Most Favorite" && (
                                <MostListCompoennt
                                    list={mostFavoriteList}
                                    isFavorite={true}
                                />
                            )}
                            {listType === "Most Posted" && (
                                <MostListCompoennt list={mostPostedList} />
                            )}
                            {listType === "Rating Rank" && (
                                <MostListCompoennt
                                    list={rankingBookList}
                                    isRanking={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </CardComponent>
            <FeedComponent />
        </div>
    );
}
