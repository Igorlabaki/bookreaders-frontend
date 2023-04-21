"use client";
import CardComponent from "@/components/util/card";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { IBookBd, IUserBook } from "@/types";
import React from "react";

export default function page() {
    return (
        <CardComponent>
            <p className="w-full px-3 py-2 font-bold text-blue-dark">
                Achivemments :
            </p>
        </CardComponent>
    );
}
