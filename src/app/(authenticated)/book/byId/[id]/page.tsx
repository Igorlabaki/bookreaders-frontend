"use client";

import { PostComponent } from "@/components/post";
import { ButtonComponent } from "@/components/util/button";
import CardComponent from "@/components/util/card";
import ChangeBookListSelectComponent from "@/components/util/changeBookListSelect";
import { ImageComponent } from "@/components/util/image";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { useGetBookByAuthor } from "@/hooks/books/getBookByAuthor";
import { useGetBookById } from "@/hooks/books/getBookById";
import { useGetMostReadList } from "@/hooks/books/getMostReadList";
import { useGetMostPostedBookList } from "@/hooks/post/getMostPostedBookList";
import useCreateBookPost from "@/hooks/post/useCreateBookPost";
import useGetBookPostBookList from "@/hooks/post/useGetBookPostList";
import { useGetAvaliationBookSummary } from "@/hooks/userBook/getAvaliationBookSummary";
import { useGetUserBookById } from "@/hooks/userBook/getUserBookById";
import useGetRankingBookList from "@/hooks/userBook/useGetRankingBookList";
import {
    IBookBd,
    ICreateBookPostParams,
    IGoogleBook,
    IMostPostedBookResponse,
    IMostReadBookResponse,
    IPost,
} from "@/types";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

interface BookPageProps {
    params: {
        id: string;
    };
}

export default function BookPage({ params }: BookPageProps) {
    const { bookById } = useGetBookById(params.id);
    const { authUser } = useRecoverUserData();
    const [listType, setListType] = useState<
        "Author books" | "Publications" | "Rating"
    >("Author books");
    const { getBookByAuthorMutate, bookByAutor } = useGetBookByAuthor();
    const { postBookListMutate, postBookList } = useGetBookPostBookList();
    const { mostReadList } = useGetMostReadList();
    const { mostPostedList } = useGetMostPostedBookList();
    const { rankingBookList } = useGetRankingBookList();
    const { avaliationBookSummaryMutate, avaliationBookSummary } =
        useGetAvaliationBookSummary();
    useEffect(() => {
        if (bookById) {
            postBookListMutate(bookById?.id);
            getBookByAuthorMutate(bookById.volumeInfo.authors[0]);
            avaliationBookSummaryMutate(params.id);
        }
    }, [bookById]);

    const bookIsInMostReadList = mostReadList?.filter(
        (item: { book: IBookBd; count: number }) => {
            if (item?.book?.google === bookById?.id) {
                return true;
            }
        }
    );

    const bookIsInMostPostedList = mostPostedList?.filter(
        (item: { book: IBookBd; count: number }) => {
            if (item?.book?.google === bookById?.id) {
                return true;
            }
        }
    );

    const bookIsInRankingList = rankingBookList?.filter(
        (item: { book: IBookBd; count: number }) => {
            if (item?.book?.google === bookById?.id) {
                return true;
            }
        }
    );

    const satrIndexList = [1, 2, 3, 4, 5];
    return (
        <div className="flex flex-col gap-y-5">
            <CardComponent>
                <div className="h-full w-full flex gap-x-4 justify-start bookById?s-start">
                    <div className="flex flex-col gap-y-5">
                        <ImageComponent
                            alt="Book cover"
                            h={"h-[60px] md:min-h-[380px] md:max-h-[380px]"}
                            w={"w-[60px] md:min-w-[250px] md:max-w-[250px]"}
                            src={
                                bookById?.volumeInfo?.imageLinks?.thumbnail ||
                                "/images/photos/book-default.jpg"
                            }
                            containerClassname={
                                "rounded-lg overflow-hidden shadow-lg"
                            }
                        />
                        <ChangeBookListSelectComponent
                            authUser={authUser}
                            book={bookById}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 justify-start bookById?s-start flex-1">
                        <div className="flex w-full justify-between items-center">
                            <p className="text-2xl font-semibold">
                                {bookById?.volumeInfo?.title}
                            </p>
                        </div>
                        <p> {bookById?.volumeInfo?.subtitle}</p>
                        <div className="min-w-[100px] text-[12px] w-auto flex gap-x-1 justify-start bookById?s-center">
                            <p className=" font-semibold">{"Author:"}</p>
                            <p className="italic">
                                {bookById?.volumeInfo?.authors
                                    ? bookById?.volumeInfo?.authors[0]
                                    : "-"}
                            </p>
                        </div>
                        <div className="flex gap-3 text-[12px]">
                            <div className="min-w-[100px] w-auto flex gap-x-1 justify-start bookById?s-center">
                                <p className="text-[12px] font-semibold">
                                    {"Cathegorie:"}
                                </p>
                                <p>
                                    {bookById?.volumeInfo?.categories
                                        ? bookById?.volumeInfo?.categories
                                        : "-"}
                                </p>
                            </div>
                        </div>
                        <div className="text-justify bg-gray-100 py-2 px-2 justify-start rounded-md min-h-[250px] max-h-[250px] overflow-y-scroll ">
                            <p>
                                {bookById?.volumeInfo?.description?.replace(
                                    "<p>",
                                    ""
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </CardComponent>
            <div className="flex justify-start items-center w-[100%] gap-x-3 text-gray-500 font-semibold">
                <p
                    className={`cursor-pointer px-3 py-3 ${
                        listType.includes("Author books")
                            ? "text-blue-600 border-b-2 border-blue-600 scale"
                            : "hover:bg-gray-200 rounded-md "
                    }`}
                    onClick={() => setListType(() => "Author books")}
                >
                    Author books
                </p>
                <p
                    className={`cursor-pointer px-3 py-3 ${
                        listType.includes("Publications")
                            ? "text-blue-600 border-b-2 border-blue-600 scale"
                            : "hover:bg-gray-200 rounded-md "
                    }`}
                    onClick={() => setListType(() => "Publications")}
                >
                    Publications
                </p>
                <p
                    className={`cursor-pointer px-3 py-3 ${
                        listType.includes("Rating")
                            ? "text-blue-600 border-b-2 border-blue-600 scale"
                            : "hover:bg-gray-200 rounded-md "
                    }`}
                    onClick={() => setListType(() => "Rating")}
                >
                    Rating
                </p>
            </div>

            {listType === "Rating" &&
                (avaliationBookSummary?._avg?.rate > 0 ? (
                    <CardComponent>
                        <div className="flex flex-col justify-start p-2 relative w-full">
                            <div className="flex justify-start items-start space-x-2 w-full">
                                <div className="flex justify-between items-center  w-full">
                                    <div className=" flex justify-start items-start gap-x-4">
                                        <div className="flex justify-start items-center gap-x-1">
                                            {satrIndexList.map(
                                                (item: number) => {
                                                    return (
                                                        <BsStarFill
                                                            size={20}
                                                            className={`
                                                            ${
                                                                avaliationBookSummary
                                                                    ?._avg
                                                                    ?.rate <
                                                                item
                                                                    ? "text-gray-300"
                                                                    : "text-yellow-400"
                                                            }
                                                        `}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                        <p className="font-semibold text-lg">
                                            {`${
                                                avaliationBookSummary?._avg
                                                    ?.rate &&
                                                avaliationBookSummary?._avg?.rate
                                                    .toFixed(1)
                                                    .replace(".", ",")
                                            } de 5
                                            `}
                                        </p>
                                    </div>
                                    <div className="flex gap-x-2">
                                        {bookIsInMostReadList && (
                                            <div className="flex justify-center items-center bg-blue-dark rounded-md shadow-lg w-[150px] gap-x-1 text-white font-semibold">
                                                <AiOutlineCheckCircle />
                                                <p
                                                    className="py-1  flex justify-center items-center
                                            text-sm 
                                            "
                                                >
                                                    Most Read Books
                                                </p>
                                            </div>
                                        )}
                                        {bookIsInMostPostedList && (
                                            <div className="flex justify-center items-center bg-blue-dark rounded-md shadow-lg w-[150px] gap-x-1 text-white font-semibold">
                                                <AiOutlineCheckCircle />
                                                <p
                                                    className="py-1 flex justify-center items-center
                                        text-sm 
                                    bg-blue-dark text-white font-semibold "
                                                >
                                                    Most Posted Books
                                                </p>
                                            </div>
                                        )}
                                        {bookIsInRankingList && (
                                            <div className="flex justify-center items-center bg-blue-dark rounded-md shadow-lg w-[150px] gap-x-1 text-white font-semibold">
                                                <AiOutlineCheckCircle />
                                                <p
                                                    className="py-1  flex justify-center items-center
                                        text-sm 
                                    font-semibold"
                                                >
                                                    Top ranking Books
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-x-4">
                                <div className="flex justify-start items-center">
                                    <p className="font-semibold text-sm  w-[50px]">
                                        Max:
                                    </p>
                                    {satrIndexList.map((item: number) => {
                                        return (
                                            <BsStarFill
                                                size={10}
                                                className={`
                                                        ${
                                                            avaliationBookSummary
                                                                ?._max?.rate <
                                                            item
                                                                ? "text-gray-300"
                                                                : "text-yellow-400"
                                                        }
                                                    `}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="flex justify-start items-center">
                                    <p className="font-semibold text-sm   w-[50px]">
                                        Min:
                                    </p>
                                    {satrIndexList.map((item: number) => {
                                        return (
                                            <BsStarFill
                                                size={10}
                                                className={`
                                                        ${
                                                            avaliationBookSummary
                                                                ?._min?.rate <
                                                            item
                                                                ? "text-gray-300"
                                                                : "text-yellow-400"
                                                        }
                                                    `}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <p className="text-sm font-light">
                                This book has{" "}
                                <span className="font-semibold">
                                    {avaliationBookSummary?._count.rate}
                                </span>{" "}
                                reviews from our readers
                            </p>
                        </div>
                    </CardComponent>
                ) : (
                    <CardComponent>
                        <div className="flex justify-center items-center h-20">
                            <p className="text-lg text-gray-400 font-semibold ">
                                This book dont have any review yet.
                            </p>
                        </div>
                    </CardComponent>
                ))}

            {listType === "Author books" && (
                <CardComponent>
                    <div className="flex justify-start  gap-5 overflow-x-scroll overflow-y-hidden  py-2 ">
                        {bookByAutor?.items
                            ?.filter((item: IGoogleBook) => {
                                if (
                                    !item?.volumeInfo?.imageLinks
                                        ?.smallThumbnail
                                ) {
                                    return false;
                                } else {
                                    return true;
                                }
                            })
                            .map((item: IGoogleBook) => {
                                return (
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => {
                                            window.location.href = `/book/byId/${item?.id}`;
                                        }}
                                    >
                                        <ImageComponent
                                            alt="Book cover"
                                            h={
                                                "h-[60px] md:min-h-[180px] md:max-h-[150px]"
                                            }
                                            w={
                                                "w-[60px] md:min-w-[130px] md:max-w-[90px]"
                                            }
                                            src={
                                                item?.volumeInfo?.imageLinks
                                                    ?.smallThumbnail ||
                                                "/images/photos/book-default.jpg"
                                            }
                                            containerClassname={
                                                "rounded-lg overflow-hidden shadow-2x1"
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </CardComponent>
            )}

            {listType === "Publications" && (
                <div className="flex flex-col gap-y-2">
                    {postBookList?.length > 0 ? (
                        postBookList?.map((post: IPost, index: number) => {
                            return <PostComponent post={post} key={index} />;
                        })
                    ) : (
                        <CardComponent>
                            <div className="flex justify-center items-center h-20">
                                <p className="text-lg text-gray-400 font-semibold ">
                                    This book dont have any publication yet.
                                </p>
                            </div>
                        </CardComponent>
                    )}
                </div>
            )}
        </div>
    );
}
