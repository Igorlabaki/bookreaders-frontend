import { InfoComponent } from "@/components/util/info";
import React from "react";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className=" text-2xl text-blue-dark md:text-4xl font-bold">
                Welcome to the BookReaders
            </h1>
            <h2 className="text-sm md:text-lg">
                A social network made for those who love to read
            </h2>
            <InfoComponent />
        </div>
    );
}
