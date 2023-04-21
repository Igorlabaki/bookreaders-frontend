"use client";
import CardComponent from "@/components/util/card";
import { ImageComponent } from "@/components/util/image";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import useSearchGoogleBooks from "@/hooks/googleBooks/useSearchGoogleBooks";
import { IGoogleBook, IUserBook } from "@/types";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";

export default function BooksPage() {
    const { authUser } = useRecoverUserData();
    const [search, setSearch] = useState<string>("");
    const pagesRead = authUser?.books
        ?.filter((book: IUserBook) => {
            if (book.listType === "Read") {
                return true;
            } else {
                return false;
            }
        })
        .map((book: IUserBook) => {
            return book?.book.pageCount;
        })
        .reduce((acc, item) => {
            return acc + item;
        });

    const averageRating =
        authUser?.books
            ?.filter((book: IUserBook) => {
                if (book.listType === "Read") {
                    return true;
                } else {
                    return false;
                }
            })
            .map((book: IUserBook) => {
                return book?.rate;
            })
            .reduce((acc, item) => {
                return acc + item;
            }) / authUser?._count.books;

    const getShortestBook = (memberBooks: IUserBook): IUserBook => {
        function compare(a, b) {
            if (a.book.pageCount < b.book.pageCount) return -1;
            if (a.book.pageCount > b.book.pageCount) return 1;
            return 0;
        }
        return memberBooks?.sort(compare)[0];
    };

    const getLongestBook = (memberBooks: IUserBook): IUserBook => {
        function compare(a, b) {
            if (a.book.pageCount < b.book.pageCount) return 1;
            if (a.book.pageCount > b.book.pageCount) return -1;
            return 0;
        }

        return memberBooks?.sort(compare)[0];
    };

    const getLastRead = (memberBooks: IUserBook): IUserBook => {
        function compare(a, b) {
            if (a.book.created_at < b.book.created_at) return 1;
            if (a.book.created_at > b.book.created_at) return -1;
            return 0;
        }

        return memberBooks?.sort(compare)[0];
    };

    const shortestBook = getShortestBook(authUser?.books);
    const longestBook = getLongestBook(authUser?.books);
    const lastRead = getLastRead(authUser?.books);
    return (
        <div className="pb-10">
            <CardComponent>
                <div className="flex flex-col justify-center items-center gap-y-10 pt-5 ">
                    {/* <div className="flex justify-center items-center gap-x-4 mt-10">
                        <div className="flex flex-col justify-center items-center gap-y-1">
                            <ImageComponent
                                alt="Book cover"
                                h={
                                    "h-[120px] md:min-h-[230px] md:max-h-[230px]"
                                }
                                w={"w-[80px] md:min-w-[150px] md:max-w-[150px]"}
                                src={
                                    shortestBook?.book?.smallThumbnail ||
                                    "/images/photos/book-default.jpg"
                                }
                                containerClassname={
                                    "rounded-lg cursor-pointer overflow-hidden shadow-lg"
                                }
                                onclik={() => {
                                    window.location.href = `/book/byId/${shortestBook?.book?.google}`;
                                }}
                            />
                            <div className="flex justify-center items-center gap-x-1">
                                <p className="text-sm font-semibold text-gray-500 ">
                                    Shortest book
                                </p>
                                <p className="text-[11px] text-gray-400">{`(${shortestBook?.book?.pageCount} pgs)`}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-y-1">
                            <ImageComponent
                                alt="Book cover"
                                h={
                                    "h-[120px] md:min-h-[230px] md:max-h-[230px]"
                                }
                                w={"w-[80px] md:min-w-[150px] md:max-w-[150px]"}
                                src={
                                    longestBook?.book?.smallThumbnail ||
                                    "/images/photos/book-default.jpg"
                                }
                                containerClassname={
                                    "rounded-lg cursor-pointer overflow-hidden shadow-lg"
                                }
                                onclik={() => {
                                    window.location.href = `/book/byId/${longestBook?.book?.google}`;
                                }}
                            />
                            <div className="flex justify-center items-center gap-x-1">
                                <p className="text-sm font-semibold text-gray-500">
                                    Longest book
                                </p>
                                <p className="text-[11px] text-gray-400">{`(${longestBook?.book?.pageCount} pgs)`}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-y-1">
                            <ImageComponent
                                alt="Book cover"
                                h={
                                    "h-[120px] md:min-h-[230px] md:max-h-[230px]"
                                }
                                w={"w-[80px] md:min-w-[150px] md:max-w-[150px]"}
                                src={
                                    lastRead?.book?.smallThumbnail ||
                                    "/images/photos/book-default.jpg"
                                }
                                containerClassname={
                                    "rounded-lg cursor-pointer overflow-hidden shadow-lg"
                                }
                                onclik={() => {
                                    window.location.href = `/book/byId/${lastRead?.book?.google}`;
                                }}
                            />
                            <div className="flex justify-center items-center gap-x-1">
                                <p className="text-sm font-semibold text-gray-500">
                                    Last book read
                                </p>
                            </div>
                        </div>
                    </div> */}
                    <div className=" gap-x-4 grid grid-cols-2 md:flex ">
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-2xl font-bold text-blue-dark">
                                {authUser?._count.books}
                            </p>
                            <p className="text-sm font-semibold text-gray-500">
                                Read Books
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-2xl font-bold text-blue-dark">
                                {pagesRead}
                            </p>
                            <p className="text-sm font-semibold text-gray-500">
                                Pages reads
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-2xl font-bold text-blue-dark">
                                {pagesRead &&
                                    authUser?._count.books &&
                                    (pagesRead / authUser?._count.books)
                                        .toFixed(1)
                                        .replace(".", ",")}
                            </p>
                            <p className="text-sm font-semibold text-gray-500">
                                Average book length
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center gap-x-1">
                                <p className="text-2xl font-bold text-blue-dark">
                                    {averageRating.toFixed(1).replace(".", ",")}
                                </p>
                                <BsStarFill className="text-yellow-500" />
                            </div>
                            <p className="text-sm font-semibold text-gray-500">
                                Average rating
                            </p>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-y-10 rounded-md w-full  m-auto">
                        <div className="bg-gray-100 rounded-lg flex w-[90%] m-auto justify-start items-center pl-4 py-2 pr-2 shadow-pattern gap-2  z-50">
                            <BiSearch className="text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={`Search in your bookshelve`}
                                className={` bg-transparent
                            font-semibold text-gray-500
                            text-md outline-none 
                            flex-1  
                            `}
                                onChange={(e) => {
                                    setSearch(() => e.target.value);
                                }}
                            />
                        </div>
                        <div className=" flex justify-center items-center gap-x-4 w-full flex-wrap gap-y-4">
                            {authUser?.books.map((userBook: IUserBook) => {
                                if (userBook.listType != "Read") {
                                    return;
                                }
                                if (
                                    !userBook?.book?.title
                                        ?.toLocaleLowerCase()
                                        .includes(search?.toLocaleLowerCase())
                                ) {
                                    return;
                                }
                                return (
                                    <div>
                                        <ImageComponent
                                            alt="Book cover"
                                            h={
                                                "h-[120px] md:min-h-[180px] md:max-h-[180px]"
                                            }
                                            w={
                                                "w-[80px] md:min-w-[120px] md:max-w-[120px]"
                                            }
                                            src={
                                                userBook.book?.smallThumbnail ||
                                                "/images/photos/book-default.jpg"
                                            }
                                            containerClassname={
                                                "rounded-lg overflow-hidden shadow-pattern   cursor-pointer"
                                            }
                                            onclik={() => {
                                                window.location.href = `/book/byId/${userBook?.book?.google}`;
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardComponent>
        </div>
    );
}
