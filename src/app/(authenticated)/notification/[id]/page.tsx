"use client";

import { PostComponent } from "@/components/post";
import { useGetNotificationById } from "@/hooks/notification/getNotificationById";

export default function Page({ params }: { params: { id: string } }) {
    const { notificationById } = useGetNotificationById(params?.id);
    console.log(notificationById);
    return <PostComponent post={notificationById?.post} />;
}
