"use client";

import CardComponent from "@/components/util/card";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { ListNotificationComponent } from "@/components/notification/listNotification";

export default function NotificationPage() {
    const { authUser } = useRecoverUserData();
    return (
        <CardComponent>
            <ListNotificationComponent
                size={10}
                fullList={true}
                notificationsList={authUser?.user_notifications}
            />
        </CardComponent>
    );
}
