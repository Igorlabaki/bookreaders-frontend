import { useViewNotification } from "@/hooks/notification/viewNotification";
import { INotifications } from "@/types";
import moment from "moment";
import React from "react";
import { FaUser } from "react-icons/fa";
import { AvatarComponent } from "../util/avatar";

interface NotificationComponentProps {
    notification: INotifications;
}

export function NotificationComponent({
    notification,
}: NotificationComponentProps) {
    const { viewNotificationMutate } = useViewNotification();
    return (
        <div
            className={`w-full hover:bg-blue-100 h-full py-2  px-2 gap-x-2 flex justify-start items-center
                                cursor-pointer
                            `}
            onClick={() => {
                viewNotificationMutate(notification?.id);
                window.location.href = `/notification/${notification?.id}`;
            }}
        >
            <div className="w-[50px]">
                <AvatarComponent
                    h="h-[45px]"
                    w="w-[45px]"
                    avatar={notification?.userAction?.urlAvatar}
                    icon={<FaUser size={25} className={"text-blue-dark"} />}
                />
            </div>
            <div className="w-full">
                <div className="w-full flex justify-between items-center flex-1">
                    <p className="text-sm font-semibold">
                        {notification?.text}
                    </p>
                    {notification?.view === false && (
                        <div className="bg-red-300 h-3 w-3 animate-pulse  rounded-full" />
                    )}
                </div>
                <p className="text-[12px] text-gray-400">
                    {moment(notification?.created_at).fromNow()}
                </p>
            </div>
        </div>
    );
}
