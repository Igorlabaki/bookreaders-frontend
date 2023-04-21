"use client";

import { useGetUserById } from "../../../../hooks/user/getUserById";

export default function Page({ params }: { params: { id: string } }) {
    const { userById } = useGetUserById(params?.id);
    console.log(userById);
    return <div>{userById?.username}</div>;
}
