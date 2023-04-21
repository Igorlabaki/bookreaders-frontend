"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AvatarComponent } from "@/components/util/avatar";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { AvatarModalComponent } from "@/components/modals/avatarModal";
import useGetUserList from "@/hooks/user/useGetUserList";
import { PostComponent } from "@/components/post";
import { IBookBd, IFollow, IPost, IUser, IUserBook } from "@/types";
import FriendComponent from "@/components/community/friend";
import CardComponent from "@/components/util/card";
import { FollowButtonComponent } from "@/components/util/followButton";
import { ImageComponent } from "@/components/util/image";
import { BiMedal, BiSearch } from "react-icons/bi";

export default function ProfilePage() {
    const { authUser } = useRecoverUserData();
    const [search, setSearch] = useState("");
    const [containerType, setContainerType] = useState<
        "Feed" | "Bookshelve" | "Followers" | "Achivements" | "Message"
    >("Feed");
    const readBooks = authUser?.books?.filter(
        (userBook: IUserBook, index: number) => {
            if (userBook.listType === "Read") {
                return true;
            }
        }
    );
    const readingBooks = authUser?.books?.filter(
        (userBook: IUserBook, index: number) => {
            if (userBook.listType === "Reading") {
                return true;
            }
        }
    );

    const wantReadBooks = authUser?.books?.filter(
        (userBook: IUserBook, index: number) => {
            if (userBook.listType === "Want to read") {
                return true;
            }
        }
    );

    const favoriteBooks = authUser?.books?.filter(
        (userBook: IUserBook, index: number) => {
            if (userBook.favorite) {
                return true;
            }
        }
    );
    return (
        <div className="relative flex flex-col mt-3 gap-y-5">
            <div className="flex flex-col justify-between w-[100%]  m-auto text-gray-500 font-semibold">
                <div
                    className={`
                    
                    flex w-full  justify-center items-center gap-x-4   m-auto text-sm md:text-lg`}
                >
                    <p
                        className={`text-[18px]  shadow-pattern rounded-md cursor-pointer px-3 py-1 flex-1 flex justify-center items-center ${
                            containerType.includes("Feed")
                                ? "text-white bg-blue-dark"
                                : "bg-white text-gray-500 rounded-md "
                        }`}
                        onClick={() => {
                            setContainerType(() => "Feed");
                        }}
                    >
                        Feed
                    </p>

                    <p
                        className={`text-[18px]  shadow-pattern rounded-md cursor-pointer px-3 py-1 flex-1 flex justify-center items-center ${
                            containerType.includes("Bookshelve")
                                ? "text-white bg-blue-dark"
                                : "bg-white text-gray-500 rounded-md "
                        }`}
                        onClick={() => {
                            setContainerType(() => "Bookshelve");
                        }}
                    >
                        Bookshelf
                    </p>
                    <p
                        className={`text-[18px] shadow-pattern rounded-md cursor-pointer px-3 py-1 flex-1 flex justify-center items-center ${
                            containerType.includes("Achivements")
                                ? "text-white bg-blue-dark"
                                : "bg-white text-gray-500 rounded-md "
                        }`}
                        onClick={() => {
                            setContainerType(() => "Achivements");
                        }}
                    >
                        Achivements
                    </p>
                    <p
                        className={`text-[18px]  shadow-pattern rounded-md cursor-pointer px-3 py-1 flex-1 flex justify-center items-center ${
                            containerType.includes("Message")
                                ? "text-white bg-blue-dark"
                                : "bg-white text-gray-500 rounded-md "
                        }`}
                        onClick={() => {
                            setContainerType(() => "Message");
                        }}
                    >
                        Message
                    </p>
                </div>
            </div>
            {authUser?.posts &&
                containerType === "Feed" &&
                authUser?.posts?.map((post: IPost, index: number) => {
                    return <PostComponent post={post} key={index} />;
                })}

            {containerType === "Achivements" && (
                <CardComponent>
                    <div className="grid w-full grid-cols-5 gap-2 h-96">
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${
                                    authUser?._count &&
                                    authUser?._count.books >= 1
                                        ? "text-stone-500"
                                        : "text-gray-200"
                                }`}
                            />
                            <p
                                className={`${
                                    authUser?._count &&
                                    authUser?._count.books >= 1
                                        ? "text-stone-500"
                                        : "text-gray-200"
                                }`}
                            >
                                1 livro
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${
                                    authUser?._count &&
                                    authUser?._count.books >= 10
                                        ? "text-stone-500"
                                        : "text-gray-200"
                                }`}
                            />
                            <p>10 livro</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${
                                    authUser?._count &&
                                    authUser?._count.books >= 50
                                        ? "text-stone-500"
                                        : "text-gray-200"
                                }`}
                            />
                            <p>50 livro</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${
                                    authUser?._count &&
                                    authUser?._count.books >= 100
                                        ? "text-stone-500"
                                        : "text-gray-200"
                                }`}
                            />
                            <p>100 livro</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${
                                    authUser?._count &&
                                    authUser?._count.books >= 1
                                        ? "text-stone-500"
                                        : "text-gray-200"
                                }`}
                            />
                            <p>+250 livro</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${authUser?._count >= 1 ? "" : ""}`}
                            />
                            <p>1 livro por mes</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${authUser?._count >= 1 ? "" : ""}`}
                            />
                            <p>2 livros por mes</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${authUser?._count >= 1 ? "" : ""}`}
                            />
                            <p>3 livros por mes</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${authUser?._count >= 1 ? "" : ""}`}
                            />
                            <p>4 livros por mes</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-2 gap-y-1 ">
                            <BiMedal
                                size={120}
                                className={`${authUser?._count >= 1 ? "" : ""}`}
                            />
                            <p>+5 livros por mes</p>
                        </div>
                        {/*            <p>decimo livro</p>
                        <p>50 livro</p>
                        <p>100 livro</p>
                        <p>250 livro</p>
                        <p>500 paginas</p>
                        <p>5 mil paginas</p>
                        <p>100 mil paginas</p>
                        <p>3 livros no mes</p>
                        <p>7 livros no mes</p>
                        <p>+10 livros no mes</p>
                        <p>2023 challenge</p> */}
                    </div>
                </CardComponent>
            )}
            {authUser?.books && containerType === "Bookshelve" && (
                <>
                    <CardComponent>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex items-center justify-start gap-1">
                                <p className="text-lg font-semibold text-blue-dark">
                                    Favorite
                                </p>
                                <p className="text-gray-500">
                                    ({favoriteBooks?.length})
                                </p>
                            </div>
                            <div className="flex items-center justify-start gap-x-4 max-w-[1005px] overflow-hidden">
                                {favoriteBooks && favoriteBooks.length > 0 ? (
                                    favoriteBooks?.map(
                                        (
                                            userBook: IUserBook,
                                            index: number
                                        ) => {
                                            return (
                                                <div>
                                                    <ImageComponent
                                                        alt={`${userBook?.book.title} book cover`}
                                                        h={
                                                            "h-[200px] md:min-h-[150px] md:max-h-[150px]"
                                                        }
                                                        w={
                                                            "w-[150px] md:min-w-[100px] md:max-w-[100px]"
                                                        }
                                                        src={
                                                            userBook?.book
                                                                ?.smallThumbnail ||
                                                            "/images/photos/book-default.jpg"
                                                        }
                                                        containerClassname={
                                                            "rounded-lg overflow-hidden cursor-pointer shadow-lg"
                                                        }
                                                        onclik={() => {
                                                            window.location.href = `/book/${userBook?.book?.google}`;
                                                        }}
                                                    />
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <ImageComponent
                                            alt="add a book"
                                            h="h-[160px]"
                                            w="w-[160px]"
                                            src="/images/photos/addBookToList.png"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardComponent>
                    <CardComponent>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex items-center justify-start gap-1">
                                <p className="text-lg font-semibold text-blue-dark">
                                    Read
                                </p>
                                <p className="text-gray-500">
                                    ({readBooks?.length})
                                </p>
                            </div>
                            <div className="flex items-center justify-start gap-x-4 max-w-[1005px] overflow-hidden">
                                {readBooks && readBooks.length > 0 ? (
                                    readBooks?.map(
                                        (
                                            userBook: IUserBook,
                                            index: number
                                        ) => {
                                            return (
                                                <div>
                                                    <ImageComponent
                                                        alt={`${userBook?.book.title} book cover`}
                                                        h={
                                                            "h-[200px] md:min-h-[150px] md:max-h-[150px]"
                                                        }
                                                        w={
                                                            "w-[150px] md:min-w-[100px] md:max-w-[100px]"
                                                        }
                                                        src={
                                                            userBook?.book
                                                                ?.smallThumbnail ||
                                                            "/images/photos/book-default.jpg"
                                                        }
                                                        containerClassname={
                                                            "rounded-lg overflow-hidden cursor-pointer shadow-lg"
                                                        }
                                                        onclik={() => {
                                                            window.location.href = `/book/${userBook?.book?.google}`;
                                                        }}
                                                    />
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <ImageComponent
                                            alt="add a book"
                                            h="h-[160px]"
                                            w="w-[160px]"
                                            src="/images/photos/addBookToList.png"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardComponent>
                    <CardComponent>
                        <div className="flex flex-col pl-4 gap-y-3">
                            <div className="flex items-center justify-start gap-1">
                                <p className="text-lg font-semibold text-blue-dark">
                                    Reading
                                </p>
                                <p className="text-gray-500">
                                    ({readingBooks?.length})
                                </p>
                            </div>
                            <form
                                className="flex bg-white rounded-lg w-[97%]"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    setSearch("");
                                }}
                            >
                                <div className="bg-gray-100 rounded-lg flex  w-[100%] m-auto justify-start items-center pl-4 py-2 pr-2 shadow-pattern gap-2 ">
                                    <BiSearch
                                        className="text-gray-400"
                                        size={20}
                                    />
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
                            <div
                                className={`
                        
                            flex justify-start items-center  gap-x-4 max-w-[1005px] overflow-hidden flex-wrap gap-y-2 m-auto`}
                            >
                                {readingBooks && readingBooks?.length > 0 ? (
                                    readingBooks?.map(
                                        (
                                            userBook: IUserBook,
                                            index: number
                                        ) => {
                                            return (
                                                <div>
                                                    <ImageComponent
                                                        alt={`${userBook?.book.title} book cover`}
                                                        h={
                                                            "h-[200px] md:min-h-[170px] md:max-h-[170px]"
                                                        }
                                                        w={
                                                            "w-[150px] md:min-w-[120px] md:max-w-[120px]"
                                                        }
                                                        src={
                                                            userBook?.book
                                                                ?.smallThumbnail ||
                                                            "/images/photos/book-default.jpg"
                                                        }
                                                        containerClassname={
                                                            "rounded-lg overflow-hidden cursor-pointer shadow-lg"
                                                        }
                                                        onclik={() => {
                                                            window.location.href = `/book/${userBook?.book?.google}`;
                                                        }}
                                                    />
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <ImageComponent
                                            alt="add a book"
                                            h="h-[160px]"
                                            w="w-[160px]"
                                            src="/images/photos/addBookToList.png"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardComponent>
                    <CardComponent>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex items-center justify-start gap-1">
                                <p className="text-lg font-semibold text-blue-dark">
                                    Want to Read
                                </p>
                                <p className="text-gray-500">
                                    ({wantReadBooks?.length})
                                </p>
                            </div>
                            <div className="flex items-center justify-start gap-x-4 max-w-[1005px] overflow-hidden">
                                {wantReadBooks && wantReadBooks?.length > 0 ? (
                                    wantReadBooks?.map(
                                        (
                                            userBook: IUserBook,
                                            index: number
                                        ) => {
                                            return (
                                                <div>
                                                    <ImageComponent
                                                        alt={`${userBook?.book.title} book cover`}
                                                        h={
                                                            "h-[200px] md:min-h-[150px] md:max-h-[150px]"
                                                        }
                                                        w={
                                                            "w-[150px] md:min-w-[100px] md:max-w-[100px]"
                                                        }
                                                        src={
                                                            userBook?.book
                                                                ?.smallThumbnail ||
                                                            "/images/photos/book-default.jpg"
                                                        }
                                                        containerClassname={
                                                            "rounded-lg overflow-hidden cursor-pointer shadow-lg"
                                                        }
                                                        onclik={() => {
                                                            window.location.href = `/book/${userBook?.book?.google}`;
                                                        }}
                                                    />
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <ImageComponent
                                            alt="add a book"
                                            h="h-[160px]"
                                            w="w-[160px]"
                                            src="/images/photos/addBookToList.png"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardComponent>
                </>
            )}
            <div className="grid grid-cols-2 gap-2">
                {authUser?.followedBy &&
                    containerType === "Followers" &&
                    authUser?.followedBy.map(
                        (follower: IFollow, index: number) => {
                            return (
                                <CardComponent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-start gap-x-2">
                                            <AvatarComponent
                                                avatar={
                                                    follower.follower.urlAvatar
                                                }
                                                h={"h-[70px]"}
                                                w={"w-[70px]"}
                                                onClick={() =>
                                                    (window.location.href = `/profile/${follower.follower?.id}`)
                                                }
                                            />
                                            <p
                                                className="font-semibold duration-300 cursor-pointer hover:underline"
                                                onClick={() =>
                                                    (window.location.href = `/profile/${follower.follower?.id}`)
                                                }
                                            >
                                                {follower.follower.username}
                                            </p>
                                        </div>
                                        <FollowButtonComponent
                                            user={follower.follower}
                                        />
                                    </div>
                                </CardComponent>
                            );
                        }
                    )}
            </div>
        </div>
    );
}
