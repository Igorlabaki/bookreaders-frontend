import useErrors from "@/functions/useErrors";
import React, { useState } from "react";

interface InputComponentProps {
    type?: string;
    field: string;
    hidden?: boolean;
    classname?: string;
    placeholder?: string;
    value: string | undefined;
    handleChangeInput: (e: any) => void;
    icon?: React.ReactNode;
}

export function InputComponent({
    type,
    value,
    field,
    hidden,
    classname,
    placeholder,
    icon,
    handleChangeInput,
}: InputComponentProps) {
    const { errors } = useErrors();
    const [first, setfirst] = useState<string>("");
    console.log(
        errors.find((error) => {
            error.field === field;
        })
    );
    return (
        <div
            className={`w-full
        ${hidden ? "hidden" : "flex"}
        relative`}
        >
            <input
                required
                type={type ? type : "text"}
                name={field}
                className={` peer
                
                ${classname}
                    w-full
                    p-5
                    rounded-md
                    font-light
                    bg-white
                    border-2
                    outline-none
                    transition
                    placeholder:text-[12px]
                    ${
                        errors.find((error) => {
                            error.field === field;
                        }) && "border-rose-500 text-rose-500"
                    }
                `}
                placeholder={" "}
                value={value}
                onChange={(e) => handleChangeInput(e)}
            />
            <label
                className={`absolute duration-150 transform text-gray-500 font-semibold
                -translate-y-3 top-4 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4  
             
                ${
                    value &&
                    " peer-placeholder-shown:translate-y-0 first-letter:peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-x-3"
                }
                `}
            >
                {field}
            </label>
        </div>
    );
}
