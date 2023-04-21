import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import React, { ReactNode } from "react";
import { ImageComponent } from "./image";

interface AvatarComponentProps {
    h: string;
    w: string;
    icon?: ReactNode;
    avatar: string | null | undefined;
    onClick?: () => void;
}

export function AvatarComponent({
    h,
    w,
    icon,
    avatar,
    onClick,
}: AvatarComponentProps) {
    return (
        <>
            {avatar ? (
                <ImageComponent
                    alt="user avatar"
                    src={avatar}
                    h={`${h}`}
                    w={`${w}`}
                    imageClassname="rounded-full bg-blue-100"
                    containerClassname="rounded-full shadow-lg cursor-pointer"
                />
            ) : (
                <div
                    className={`
                    ${h} ${w} cursor-pointer bg-gray-200 rounded-full flex 
                    justify-center items-center  overflow-hidden shadow-lg`}
                >
                    {icon}
                </div>
            )}
        </>
    );
}
