"use client";

import { IPost } from "@/types";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../util/button";
import { phrases } from "@/constants/randomPhrases";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { useQuery } from "@tanstack/react-query";
import useCreatePost from "@/hooks/post/useCreatePost";
import CardComponent from "../util/card";
import { AvatarComponent } from "../util/avatar";
import { FaUser } from "react-icons/fa";

interface InputProps {
    post?: IPost;
}

export function InputPostComponent({ post }: InputProps) {
    const [error, setError] = useState("");
    const { authUser } = useRecoverUserData();
    const [index, setINdex] = useState<number>();
    const [textInput, setTextInput] = useState("");

    const { createPostMutate } = useCreatePost();

    const phrases = [
        "I love books beacause...",
        "Why do you love books?",
        "What`s your favourite book?",
        "What`s your favourite author?",
    ];

    const randomIndex = Math.floor(Math.random() * phrases.length); // gera um índice aleatório
    const randomPhrase = phrases[randomIndex];

    return (
        <CardComponent>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createPostMutate({
                        text: textInput,
                        userId: authUser?.id,
                    });
                    setTextInput("");
                }}
                className="flex items-center justify-start ml-3 gap-x-4"
            >
                <div className="md:w-[60px]">
                    <AvatarComponent
                        avatar={authUser?.urlAvatar}
                        h={"h-[50px] md:h-[60px]"}
                        w={"w-[50px] md:w-[60px]"}
                        icon={<FaUser size={25} className={"text-blue-dark"} />}
                    />
                </div>
                <div className="flex items-center justify-center flex-1 gap-3 px-4 py-2 font-semibold text-gray-500 bg-gray-100 rounded-md only: rounded-b-md">
                    <input
                        placeholder={randomPhrase}
                        value={error ? error : textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className={`w-full rounded-lg  
                bg-gray-100
                outline-none  resize-none`}
                    />
                </div>
            </form>
        </CardComponent>
    );
}
