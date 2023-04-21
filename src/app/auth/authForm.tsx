"use client";

import { useEffect, useState } from "react";
import useErrors from "@/functions/useErrors";
import isEmailValid from "@/functions/isEmailValid";
import { InputComponent } from "@/components/util/input";
import { ButtonComponent } from "@/components/util/button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { ErrorAuth } from "@/types";
import { useSignIn } from "@/hooks/auth/useSignIn";

interface IRequestBody {
    email: string;
    password: string;
    username: string;
}

export function AuthFormComponent() {
    const { signUp, errorSignUpAuthToken, isErrorSignUpAuthToken } =
        useSignUp();
    const { signIn, errorSignInAuthToken, isErrorSignInAuthToken } =
        useSignIn();

    const { setError, removeError, errors } = useErrors();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formMode, setFormMode] = useState<"signIn" | "signUp">("signIn");

    const [requestBody, setRequestBody] = useState<IRequestBody>({
        email: "",
        password: "",
        username: "",
    });

    const signInMode = formMode.includes("signIn");

    function handleChangeInput(event: any) {
        const field = event.target.name;
        const value = event.target.value;

        setRequestBody({ ...requestBody, [field]: value });

        if (!value) {
            setError({ field: field, message: `${field} is required` });
        } else if (field === "email" && !isEmailValid(value)) {
            setError({ field: field, message: `This ${field} is invalid` });
        } else {
            removeError(field);
        }
    }

    useEffect(() => {
        if (isErrorSignUpAuthToken) {
            const messageError = errorSignUpAuthToken?.response?.data.message;
            setError({ field: messageError, message: messageError });
            setTimeout(() => removeError(messageError), 2000);
        }
    }, [isErrorSignUpAuthToken]);

    useEffect(() => {
        if (isErrorSignInAuthToken) {
            const messageError = errorSignInAuthToken?.response?.data.message;
            setError({ field: messageError, message: messageError });
            setTimeout(() => removeError(messageError), 2000);
        }
    }, [isErrorSignInAuthToken]);

    return (
        <div className="relative w-full min-h-full px-5 md:px-10">
            <p className="w-full text-center text-[1.5rem] text-blue-dark font-semibold my-10 ">
                {signInMode ? "Sign In" : "Sign Up"}
            </p>
            {errors.length > 0 && (
                <div
                    className={`e
                bg-red-200 text-red-700 flex justify-center items-start absolute top-24
                rounded-lg text-[12px] italic font-semibold  py-1 px-3
                animate-openOpacity flex-col space-x-2 w-[93%] m-auto
                `}
                >
                    <p>Please correct the error(s) below:</p>
                    {errors.map((error: ErrorAuth, index: number) => {
                        return <p key={index}>- {error.message}</p>;
                    })}
                </div>
            )}
            <div className="flex flex-col items-center justify-center mt-16 gap-y-2">
                <InputComponent
                    field="email"
                    value={requestBody?.email}
                    handleChangeInput={(e) => handleChangeInput(e)}
                />
                <InputComponent
                    field="username"
                    hidden={signInMode && true}
                    value={requestBody?.username}
                    handleChangeInput={(e) => handleChangeInput(e)}
                />
                <div className="relative flex items-center justify-center w-full">
                    <InputComponent
                        field="password"
                        value={requestBody?.password}
                        type={showPassword ? "text" : "password"}
                        handleChangeInput={(e) => handleChangeInput(e)}
                    />
                    <div
                        className="absolute cursor-pointer top-5 right-5"
                        onClick={() => setShowPassword(() => !showPassword)}
                    >
                        {showPassword ? (
                            <AiFillEye className="text-blue-dark" />
                        ) : (
                            <AiFillEyeInvisible className="text-blue-dark" />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-start w-full my-2 text-sm font-semibold gap-x-2 text-blue-dark">
                <p>
                    {signInMode
                        ? "Are you new here?"
                        : "Do you already have an account?"}
                </p>
                <ButtonComponent
                    title={signInMode ? "Sign Up" : "Sign In"}
                    className={`animate-pulse`}
                    onClick={() => {
                        if (signInMode) {
                            setFormMode("signUp");
                        } else {
                            setFormMode("signIn");
                        }
                    }}
                />
            </div>
            <ButtonComponent
                title="Confirm"
                className="flex items-center justify-center w-full py-2 mx-auto my-10 font-semibold text-white duration-700 rounded-md shadow-lg bg-blue-dark hover:shadow-none hover:brightness-125"
                onClick={() => {
                    if (signInMode) {
                        signIn(requestBody);
                    } else {
                        signUp(requestBody);
                    }
                }}
            />
        </div>
    );
}
