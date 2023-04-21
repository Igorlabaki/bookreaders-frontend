"use client";

import { AuthFormComponent } from "./authForm";

export default function AuthPage() {
    return (
        <div
            className="border-[1px] border-dark-blue bg-white shadow-lg
            rounded-lg flex flex-col gap-y-5
            justify-center items-center w-[90%] md:w-[600px]  m-auto pb-10"
        >
            <AuthFormComponent />
        </div>
    );
}
