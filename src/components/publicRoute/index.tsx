"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUserAuthenticated } from "@/functions/isUserAuthenticated";

interface PublicRouterProps {
    children: ReactNode;
}

export function PublicRouter({ children }: PublicRouterProps) {
    const { push } = useRouter();
    const isUserAuthorized = isUserAuthenticated();

    useEffect(() => {
        if (isUserAuthorized) {
            window.location.href = "/home";
        }
    }, [push, isUserAuthorized]);

    return <>{children}</>;
}
