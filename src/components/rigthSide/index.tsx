import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { useUpdateStatusChallengent } from "@/hooks/challenge/useUpdateStatusChallengent";
import { IUserBook } from "@/types";
import React, { useState, useEffect } from "react";
import CardComponent from "../util/card";
import SearchBookBarComponent from "../util/searchBookBar";
import CurrentlyReadingItemComponent from "./currentlyReadingItem";
import ReadingChallengeComponent from "../leftSide/readingChallenge";
import WantToReadComponent from "./wantToReadItem";
import FavoriteComponent from "./favoriteItem";
import ListSectionComponent from "./listSection";
import { ImageComponent } from "../util/image";

export default function RigthSideComponent() {
    const { authUser } = useRecoverUserData();

    const { updateStatusChallengeMutate } = useUpdateStatusChallengent();
    const [sideMode, setSideMode] = useState<
        "Reading" | "Want to Read" | "Favorite"
    >("Favorite");

    useEffect(() => {
        if (authUser) {
            if (
                authUser?.Challenge?.goal === authUser?._count?.books &&
                !authUser?.Challenge?.complete
            ) {
                updateStatusChallengeMutate({
                    challengeId: authUser?.Challenge?.id,
                    status: true,
                });
            }

            if (
                authUser?.Challenge?.goal > authUser?._count?.books &&
                authUser?.Challenge?.complete
            ) {
                updateStatusChallengeMutate({
                    challengeId: authUser?.Challenge?.id,
                    status: false,
                });
            }
        }
    }, [authUser]);

    const favoriteBooks = authUser?.books.filter((userBook: IUserBook) => {
        if (userBook.favorite) {
            return true;
        }
    });

    const readingBooks = authUser?.books.filter((userBook: IUserBook) => {
        if (userBook.listType === "Reading") {
            return true;
        }
    });

    const wantToReadBook = authUser?.books.filter((userBook: IUserBook) => {
        if (userBook.listType === "Want to read") {
            return true;
        }
    });
    return (
        <div className="w-[20%] flex flex-col gap-y-5 ">
            <CardComponent overflow="hidden ">
                <div
                    className={`w-[900px] flex gap-x-12 relative
                    ${
                        sideMode === "Want to Read" &&
                        "translate-x-[-725px] duration-300"
                    } 
                    
                    ${
                        sideMode === "Reading" &&
                        "translate-x-[-365px] duration-500"
                    }
                    
                    ${
                        sideMode === "Favorite" &&
                        "translate-x-[0px] duration-500"
                    }
                `}
                >
                    <ListSectionComponent
                        text="What are your favorite boooks?"
                        title="Favorite Books"
                    >
                        <div
                            className={`flex flex-col ${
                                favoriteBooks && favoriteBooks?.length > 0
                                    ? "justify-start"
                                    : "justify-center"
                            } items-center gap-y-5 mt-2 max-h-[510px] min-h-[510px] overflow-y-auto`}
                        >
                            {favoriteBooks && favoriteBooks?.length > 0 ? (
                                favoriteBooks.map((userBook: IUserBook) => {
                                    return (
                                        <FavoriteComponent
                                            userBook={userBook}
                                        />
                                    );
                                })
                            ) : (
                                <ImageComponent
                                    alt="add a book"
                                    h="h-[500px]"
                                    w="w-[200px]"
                                    src="/images/photos/addBookToList.png"
                                />
                            )}
                        </div>
                    </ListSectionComponent>

                    <ListSectionComponent
                        text=" What are you reading?"
                        title="Currently Reading"
                    >
                        <div
                            className={`
                        ${
                            readingBooks && readingBooks?.length > 0
                                ? "justify-start"
                                : "justify-center"
                        }
                        flex flex-col  items-center gap-y-5 mt-2 max-h-[510px] min-h-[510px] overflow-y-auto`}
                        >
                            {readingBooks && readingBooks?.length > 0 ? (
                                readingBooks.map((userBook: IUserBook) => {
                                    return (
                                        <CurrentlyReadingItemComponent
                                            userBook={userBook}
                                        />
                                    );
                                })
                            ) : (
                                <ImageComponent
                                    alt="add a book"
                                    h="h-[500px]"
                                    w="w-[200px]"
                                    src="/images/photos/addBookToList.png"
                                />
                            )}
                        </div>
                    </ListSectionComponent>

                    <ListSectionComponent
                        text=" What do you want to read next?"
                        title="Want to read"
                    >
                        <div
                            className={`
                        ${
                            wantToReadBook && wantToReadBook?.length > 0
                                ? "justify-start"
                                : "justify-center"
                        }
                        flex flex-col items-center gap-y-5 mt-2 max-h-[510px] min-h-[510px] overflow-y-auto`}
                        >
                            {wantToReadBook && wantToReadBook?.length > 0 ? (
                                wantToReadBook.map((userBook: IUserBook) => {
                                    return (
                                        <WantToReadComponent
                                            userBook={userBook}
                                        />
                                    );
                                })
                            ) : (
                                <ImageComponent
                                    alt="add a book"
                                    h="h-[500px]"
                                    w="w-[200px]"
                                    src="/images/photos/addBookToList.png"
                                />
                            )}
                        </div>
                    </ListSectionComponent>
                </div>
                <div className="flex items-center justify-center w-full mt-4 mb-1 space-x-3 ">
                    <div
                        className={`h-2 w-2  ${
                            sideMode.includes("Favorite")
                                ? "bg-blue-400 "
                                : "bg-gray-300 "
                        }  rounded-full cursor-pointer`}
                        onClick={() => setSideMode("Favorite")}
                    />
                    <div
                        className={`h-2 w-2 ${
                            sideMode.includes("Reading")
                                ? "bg-blue-400 "
                                : "bg-gray-300 "
                        } rounded-full cursor-pointer`}
                        onClick={() => setSideMode("Reading")}
                    />
                    <div
                        className={`h-2 w-2 ${
                            sideMode.includes("Want to Read")
                                ? "bg-blue-400 "
                                : "bg-gray-300 "
                        } rounded-full cursor-pointer`}
                        onClick={() => setSideMode("Want to Read")}
                    />
                </div>
            </CardComponent>
        </div>
    );
}
