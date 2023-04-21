"use client";
import CardComponent from "@/components/util/card";
import ChangeBookListSelectComponent from "@/components/util/changeBookListSelect";
import { ImageComponent } from "@/components/util/image";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import useSearchGoogleBooks from "@/hooks/googleBooks/useSearchGoogleBooks";
import { useUpdateFavorite } from "@/hooks/userBook/useUpdateFavorite";
import { IGoogleBook, IUserBook } from "@/types";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

interface paramsType {
    params: {
        search: string;
    };
}

export default function page(params: paramsType) {
    const { googleSearchMutate, googleSearch } = useSearchGoogleBooks();
    const { updateFavoriteMutate } = useUpdateFavorite();
    const { authUser } = useRecoverUserData();
    useEffect(() => {
        if (params) {
            googleSearchMutate({ search: params.params.search });
        }
    }, [params]);
    const [favouriteIsTrue, setFavoriteIsTrue] = useState<boolean>(false);
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 gap-y-3 ">
            {googleSearch?.items?.map((item: IGoogleBook) => {
                const userBoookRead = authUser?.books.find(
                    (userBook: IUserBook) => {
                        if (
                            userBook?.book?.google === item?.id &&
                            userBook?.listType === "Read"
                        ) {
                            return true;
                        }
                    }
                );
                return (
                    <CardComponent>
                        <div className="relative flex items-start justify-start h-full gap-x-2">
                            <ImageComponent
                                h="h-[80px]"
                                alt="book"
                                w={"w-[60px]"}
                                containerClassname={
                                    "rounded-lg  overflow-hidden shadow-lg cursor-pointer"
                                }
                                src={
                                    item.volumeInfo.imageLinks
                                        ?.smallThumbnail ||
                                    "/images/photos/book-default.jpg"
                                }
                                onclik={() => {
                                    window.location.href = `/book/byId/${item?.id}`;
                                }}
                            />
                            <div className="flex flex-col items-start justify-between flex-1 h-full">
                                <div>
                                    <p className="font-semibold font">
                                        {item.volumeInfo.title}
                                    </p>
                                    <p className="text-sm italic font">
                                        by{" "}
                                        {Array.isArray(item?.volumeInfo.authors)
                                            ? item?.volumeInfo?.authors[0]
                                            : item?.volumeInfo?.authors}
                                    </p>
                                </div>
                                <div className="w-[250px]">
                                    <ChangeBookListSelectComponent
                                        book={item}
                                        authUser={authUser}
                                    />
                                </div>
                            </div>
                            {userBoookRead && (
                                <AiFillHeart
                                    className={`
                                ${
                                    userBoookRead.favorite
                                        ? "text-pink-700"
                                        : "text-gray-400"
                                }
                                absolute bottom-2 right-2 cursor-pointer duration-300
                                hover:text-pink-700
                                `}
                                    size={20}
                                    onClick={() => {
                                        updateFavoriteMutate({
                                            userBookId: userBoookRead.id,
                                            favorite: !userBoookRead.favorite,
                                        });
                                    }}
                                />
                            )}
                        </div>
                    </CardComponent>
                );
            })}
        </div>
    );
}
