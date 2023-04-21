import useSearchGoogleBooks from "@/hooks/googleBooks/useSearchGoogleBooks";
import { IGoogleBook } from "@/types";
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { ButtonComponent } from "./button";
import CardComponent from "./card";
import { ImageComponent } from "./image";

interface SearchBookBarProps {
    smSize?: boolean;
}

export default function SearchBookBarComponent({ smSize }: SearchBookBarProps) {
    const [search, setSearch] = useState("");
    const [regex, setRegex] = useState<any>();
    const { googleSearchMutate, googleSearch } = useSearchGoogleBooks();

    useEffect(() => {
        const regex = new RegExp(`.{0,${search.length}}`, "g");
        setRegex(() => regex);
    }, [search]);

    return (
        <form
            className="flex w-full  bg-white rounded-lg  relative"
            onSubmit={(e) => {
                e.preventDefault();
                setSearch("");
            }}
        >
            <div className="bg-gray-100 rounded-lg flex w-[100%] m-auto justify-start items-center pl-4 py-2 pr-2 shadow-pattern gap-2  z-50">
                <BiSearch className="text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder={`Search your book`}
                    className={` bg-transparent
                    font-semibold text-gray-500
                    text-md outline-none 
                    flex-1 
                    ${googleSearch ? "rounded-bl-none" : "rounded-br-lg"}  
                    `}
                    onChange={(e) => {
                        if (e.target.value) {
                            setSearch(() => e.target.value);
                            googleSearchMutate({ search: e.target.value });
                        }
                    }}
                />
            </div>
            {googleSearch && search != "" && (
                <div className="absolute top-[37px] w-full flex flex-col bg-white z-40 rounded-b-md shadow-pattern pt-2">
                    {googleSearch.items
                        ?.slice(0, 5)
                        .map((item: IGoogleBook) => {
                            const title = item?.volumeInfo?.title;
                            const subtitle = item?.volumeInfo?.subtitle;
                            const author = Array.isArray(
                                item?.volumeInfo?.categories
                            )
                                ? item?.volumeInfo?.categories[0]
                                : "";
                            return (
                                <div className="flex justify-start gap-x-2 items-start px-3 py-2 hover:bg-blue-100 overflow-hidden">
                                    <ImageComponent
                                        h={`${
                                            smSize ? "h-[80px]" : "h-[80px]"
                                        }`}
                                        alt="book"
                                        w={`${
                                            smSize ? "w-[60px]" : "w-[60px]"
                                        }`}
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
                                    <div
                                        className={`
                                ${!item.volumeInfo?.subtitle && "gap-y-2"}
                                flex flex-col justify-start items-start flex-1 h-full`}
                                    >
                                        <div className="text-sm">
                                            <div
                                                className={`font-semibold  flex
                                                ${
                                                    smSize
                                                        ? "text-[11px]"
                                                        : "text-[15px]"
                                                }
                                            `}
                                            >
                                                {title
                                                    ?.match(regex)
                                                    ?.map((letter: string) => {
                                                        const lowerCaseLetter =
                                                            letter.toLocaleLowerCase();
                                                        const lowerCaseSearch =
                                                            search.toLocaleLowerCase();
                                                        const isLetterInSearch =
                                                            lowerCaseSearch.includes(
                                                                lowerCaseLetter
                                                            );
                                                        return (
                                                            <p
                                                                className={`${
                                                                    isLetterInSearch
                                                                        ? " border-b-[1.5px] broder-black font-extrabold text-[17px] "
                                                                        : "text-black"
                                                                }`}
                                                            >
                                                                {letter}
                                                            </p>
                                                        );
                                                    })}
                                            </div>
                                            <p className="mt-1">
                                                <div
                                                    className={`font-semibold text-[15px] flex
                                                        ${
                                                            smSize
                                                                ? "hidden"
                                                                : "flex"
                                                        }
                                                `}
                                                >
                                                    {subtitle
                                                        ?.match(regex)
                                                        ?.map(
                                                            (
                                                                letter: string
                                                            ) => {
                                                                const lowerCaseLetter =
                                                                    letter.toLocaleLowerCase();
                                                                const lowerCaseSearch =
                                                                    search.toLocaleLowerCase();
                                                                const isLetterInSearch =
                                                                    lowerCaseSearch.includes(
                                                                        lowerCaseLetter
                                                                    );
                                                                return (
                                                                    <p
                                                                        className={`${
                                                                            isLetterInSearch
                                                                                ? " border-b-[1.5px] broder-black font-extrabold text-[17px] "
                                                                                : "text-black"
                                                                        }`}
                                                                    >
                                                                        {letter}
                                                                    </p>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </p>
                                        </div>
                                        <div
                                            className={`min-w-[100px] text-[12px] w-auto flex gap-x-1 justify-start items-center`}
                                        >
                                            <p className=" font-semibold">by</p>
                                            <p className="italic">
                                                {item?.volumeInfo?.authors ? (
                                                    <div
                                                        className={`font-semibold flex
                                                    ${
                                                        smSize
                                                            ? "text-[11px]"
                                                            : "text-[15px]"
                                                    }
                                                    `}
                                                    >
                                                        {author
                                                            ?.match(regex)
                                                            ?.map(
                                                                (
                                                                    letter: string
                                                                ) => {
                                                                    const lowerCaseLetter =
                                                                        letter.toLocaleLowerCase();
                                                                    const lowerCaseSearch =
                                                                        search.toLocaleLowerCase();
                                                                    const isLetterInSearch =
                                                                        lowerCaseSearch.includes(
                                                                            lowerCaseLetter
                                                                        );
                                                                    return (
                                                                        <p
                                                                            className={`${
                                                                                isLetterInSearch
                                                                                    ? ` border-b-[1.5px] broder-black font-extrabold  ${
                                                                                          smSize
                                                                                              ? "text-[11px]"
                                                                                              : "text-[17px]"
                                                                                      } `
                                                                                    : "text-black"
                                                                            }`}
                                                                        >
                                                                            {
                                                                                letter
                                                                            }
                                                                        </p>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                        <div
                                            className={`
                                         ${smSize ? "hidden" : "flex"}
                                        flex gap-3 text-[12px]`}
                                        >
                                            <div className="min-w-[100px] w-auto flex gap-x-1 justify-start items-center">
                                                <p className="text-[12px] font-semibold">
                                                    {"Cathegorie:"}
                                                </p>
                                                <p>
                                                    {item.volumeInfo?.categories
                                                        ? item.volumeInfo
                                                              ?.categories
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <hr />
                    <ButtonComponent
                        title="See all"
                        onClick={() => {
                            window.location.href = `/book/searchList/${search}`;
                        }}
                        className="text-center font-bold text-blue-dark py-2 hover:bg-blue-100"
                    />
                </div>
            )}
        </form>
    );
}
