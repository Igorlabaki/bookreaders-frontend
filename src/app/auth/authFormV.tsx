"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { useSignUp } from "@/hooks/auth/useSignUp";

export default function AuthFormVComponent() {
    const { signUp } = useSignUp();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        signUp(data);
    };

    return <div></div>;
}
