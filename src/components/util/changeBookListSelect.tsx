import useCreateBookPost from "@/hooks/post/useCreateBookPost";
import useUserBookDelete from "@/hooks/userBook/userBookDelete";
import {
    IBookBd,
    ICreateBookPostParams,
    IGoogleBook,
    IUser,
    IUserBook,
} from "@/types";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineStar } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { ModalComponent } from "../util/modal";
import { ButtonComponent } from "./button";
import { ImageComponent } from "./image";
interface ChangeBookListSelectProps {
    authUser: IUser | undefined;
    book: IGoogleBook | undefined;
}

export default function ChangeBookListSelectComponent({
    authUser,
    book,
}: ChangeBookListSelectProps) {
    const [listType, setlistType] = useState<
        "Read" | "Reading" | "Want to read"
    >("Want to read");
    const [starIndex, setStarIndex] = useState<number>(0);
    const [favouriteIsTrue, setFavoriteIsTrue] = useState<boolean>(false);
    const [readBookModal, setReadBookModal] = useState(false);
    const { createBookPostMutate } = useCreateBookPost();
    const [listTypeModal, setListTypeModal] = useState<boolean>(false);
    const [starClickIndex, setStarClickIndex] = useState<number>(0);
    const [deleteUserBookButton, setDeleteUserBookButton] = useState(false);
    const [inputCreateBookPost, setInputCreateBookPost] =
        useState<ICreateBookPostParams>({
            rate: 0,
            text: "",
            userId: authUser?.id || "",
            google: book?.id || "",
            title: book?.volumeInfo?.title || "",
            author: Array.isArray(book?.volumeInfo?.authors)
                ? book?.volumeInfo?.authors[0]
                : book?.volumeInfo?.authors,
            subtitle: book?.volumeInfo?.subtitle || "",
            pageCount: book?.volumeInfo?.pageCount || 0,
            categories: Array.isArray(book?.volumeInfo?.categories)
                ? book?.volumeInfo?.categories[0]
                : book?.volumeInfo?.categories,
            description: book?.volumeInfo?.description || "",
            smallThumbnail: book?.volumeInfo?.imageLinks?.smallThumbnail || "",
        });
    const { userBookDeleteMutate } = useUserBookDelete();

    const userBookAlreadyExits: IUserBook[] = authUser?.books.filter(
        (item: IUserBook) => {
            if (item.book.google === book?.id) {
                return true;
            }
        }
    );
    const inputBookPostInitial = {
        rate: 0,
        text: "",
        userId: authUser?.id || "",
        google: book?.id || "",
        title: book?.volumeInfo?.title || "",
        author: Array.isArray(book?.volumeInfo?.authors)
            ? book?.volumeInfo?.authors[0]
            : book?.volumeInfo?.authors,
        subtitle: book?.volumeInfo?.subtitle || "",
        pageCount: book?.volumeInfo?.pageCount || 0,
        categories: Array.isArray(book?.volumeInfo?.categories)
            ? book?.volumeInfo?.categories[0]
            : book?.volumeInfo?.categories,
        description: book?.volumeInfo?.description || "",
        smallThumbnail: book?.volumeInfo?.imageLinks?.smallThumbnail || "",
    };

    const satrIndexList = [1, 2, 3, 4, 5];

    return (
        <div
            className={`
                                ${
                                    listTypeModal
                                        ? "rounded-t-md rounded-br-md"
                                        : "rounded-md"
                                }
                                ${
                                    userBookAlreadyExits?.length > 0
                                        ? "bg-gray-200"
                                        : "bg-blue-dark"
                                }
                                w-full h-6  flex pl-2 relative`}
        >
            <div className="flex-1">
                {userBookAlreadyExits?.length > 0 ? (
                    <div className="flex items-center justify-start gap-x-2">
                        <div
                            onMouseOver={() => {
                                setDeleteUserBookButton(true);
                            }}
                            onMouseOut={() => {
                                setDeleteUserBookButton(false);
                            }}
                        >
                            {deleteUserBookButton ? (
                                <IoClose
                                    className="text-red-700 cursor-pointer"
                                    onClick={() => {
                                        userBookDeleteMutate(
                                            userBookAlreadyExits[0]?.id
                                        );
                                    }}
                                />
                            ) : (
                                <FcCheckmark />
                            )}
                        </div>
                        {userBookAlreadyExits[0]?.listType}
                    </div>
                ) : (
                    <div className="w-full font-semibold text-white">
                        <p>Want to read</p>
                    </div>
                )}
            </div>
            <div
                onClick={() => setListTypeModal(!listTypeModal)}
                className={`
                                ${
                                    listTypeModal
                                        ? "rounded-tr-md"
                                        : "rounded-tr-md rounded-br-md"
                                }
                                flex cursor-pointer justify-center items-center text-white w-[30px]
                                h-full bg-blue-dark`}
            >
                <IoIosArrowDown
                    className={`
                                    ${
                                        !listTypeModal
                                            ? "rotate-180 duration-300"
                                            : "rotate-[360deg] duration-300"
                                    }
                                    `}
                />
            </div>
            {listTypeModal && (
                <div className="absolute top-[22px] left-0 w-[250px] bg-gray-200 border-t-[1px] border-black rounded-b-md animate-openItems z-50">
                    <p
                        className={`
                                        hover:bg-blue-100 cursor-pointer w-full h-full pl-2
                                    `}
                        onClick={() => {
                            setlistType("Read");
                            setReadBookModal(() => true);
                            setListTypeModal(false);
                        }}
                    >
                        Read
                    </p>
                    <p
                        className={`
                                        hover:bg-blue-100 cursor-pointer w-full h-full pl-2
                                    `}
                        onClick={() => {
                            setlistType("Reading");
                            createBookPostMutate({
                                ...inputBookPostInitial,
                                action: "is reading",
                                listType: "Reading",
                            });
                            setListTypeModal(false);
                        }}
                    >
                        Reading
                    </p>
                    <p
                        className={`
                                            hover:bg-blue-100 cursor-pointer w-full h-full pl-2
                                        `}
                        onClick={() => {
                            setlistType("Want to read");
                            createBookPostMutate({
                                ...inputBookPostInitial,
                                action: "want to read.",
                                listType: "Want to read",
                            });
                            setListTypeModal(false);
                        }}
                    >
                        Want to read
                    </p>
                </div>
            )}
            {readBookModal && (
                <ModalComponent onClose={() => setReadBookModal(false)}>
                    <div className="bg-white p-3 rounded-md w-[400px] h-[480px] flex flex-col gap-y-3">
                        <div className="flex gap-x-2 justify-start items-start border-[1px] rounded-md border-gray-200 p-2">
                            <ImageComponent
                                alt="Book cover"
                                h={"h-[60px] md:min-h-[100px] md:max-h-[100px]"}
                                w={"w-[60px] md:min-w-[70px] md:max-w-[70px]"}
                                src={
                                    book?.volumeInfo?.imageLinks?.thumbnail ||
                                    "/images/photos/book-default.jpg"
                                }
                                containerClassname={
                                    "rounded-lg overflow-hidden shadow-lg"
                                }
                            />
                            <div className="relative flex flex-col items-start justify-start w-full h-full">
                                <p className="text-lg font-semibold">
                                    {book?.volumeInfo.title}
                                </p>
                                <p>{book?.volumeInfo.subtitle}</p>
                                <p className="italic font-light">
                                    by {book?.volumeInfo?.authors[0]}
                                </p>
                                <AiFillHeart
                                    className={`
                                    ${
                                        favouriteIsTrue
                                            ? "text-pink-700"
                                            : "text-gray-400"
                                    }
                                    absolute bottom-2 right-2 cursor-pointer duration-300
                                    hover:text-pink-700
                                    `}
                                    size={20}
                                    onClick={() =>
                                        setFavoriteIsTrue(!favouriteIsTrue)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-x-2">
                            <p className="font-light">My rating:</p>
                            <div className="flex items-center justify-start gap-x-1">
                                {satrIndexList.map((item: number) => {
                                    return (
                                        <BsStarFill
                                            className={`
                                            ${
                                                starIndex < item &&
                                                inputCreateBookPost.rate < item
                                                    ? "text-gray-300"
                                                    : "text-yellow-400"
                                            }
                                            cursor-pointer
                                        `}
                                            onMouseOver={() =>
                                                setStarIndex(item)
                                            }
                                            onMouseOut={() => setStarIndex(0)}
                                            onClick={() =>
                                                setInputCreateBookPost({
                                                    ...inputCreateBookPost,
                                                    rate: item,
                                                })
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <p className="font-light">What did you think?</p>
                            <textarea
                                name=""
                                id=""
                                className="bg-gray-200 outline-none w-full h-[200px] p-2"
                                onChange={(e) =>
                                    setInputCreateBookPost({
                                        ...inputCreateBookPost,
                                        text: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                        <ButtonComponent
                            onClick={() => {
                                createBookPostMutate({
                                    ...inputBookPostInitial,
                                    rate: inputCreateBookPost.rate,
                                    text: inputCreateBookPost.text,
                                    action: "has read",
                                    listType: "Read",
                                    favorite: favouriteIsTrue,
                                });
                                setListTypeModal(false);
                            }}
                            title="Post"
                            className="w-full py-2 font-semibold text-white rounded-md shadow-lg bg-blue-dark peer-hover:brightness-150"
                        />
                    </div>
                </ModalComponent>
            )}
        </div>
    );
}
