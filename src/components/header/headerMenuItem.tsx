import { INotifications } from "@/types";
import React, { ReactNode } from "react";

interface HeaderMenuItemComponentProps {
    icon: ReactNode;
    list?: INotifications[] | undefined;
}

export function HeaderMenuItemComponent({
    icon,
    list,
}: HeaderMenuItemComponentProps) {
    return (
        <div
            className={`flex justify-center items-center
             rounded-md p-2 relative cursor-pointer hover:bg-gray-200`}
        >
            {icon}
            {list && list?.length > 0 && (
                <div
                    className="z-50 bg-red-400 p-2 text-sm rounded-full h-5 w-5 flex 
        justify-center items-center absolute top-[-0.5rem] right-[-0.5rem] "
                >
                    <p className="text-white">{list.length}</p>
                </div>
            )}
        </div>
    );
}
