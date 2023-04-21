import { useViewNotification } from "@/hooks/notification/viewNotification";
import { INotifications, IUser } from "@/types";
import moment from "moment";
import React from "react";
import { NotificationComponent } from ".";

interface ListNotificationComponentProps {
    size?: number;
    fullList?: boolean;
    notificationsList: INotifications[] | undefined;
}

export function ListNotificationComponent({
    fullList,
    notificationsList,
}: ListNotificationComponentProps) {
    return (
        <div>
            <p className="w-full px-3 py-2 font-bold text-blue-dark">
                Notifications
            </p>
            {notificationsList?.map(
                (notification: INotifications, index: number) => {
                    const lastItem = index === notificationsList.length - 1;
                    if (notification.view === true && !fullList) {
                        return;
                    }
                    return (
                        <div className="full">
                            <NotificationComponent
                                notification={notification}
                            />
                            <hr
                                className={`w-full border-[1px] ${
                                    lastItem && "hidden"
                                }`}
                            />
                        </div>
                    );
                }
            )}
        </div>
    );
}
