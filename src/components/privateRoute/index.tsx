"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUserAuthenticated } from "@/functions/isUserAuthenticated";
import { APP_PUBLIC_ROUTES } from "@/constants/protectedRouter";

interface PrivateRouterProps {
    children: ReactNode;
}

export function PrivateRouter({ children }: PrivateRouterProps) {
    const { push } = useRouter();

    const isUserAuthorized = isUserAuthenticated();

    useEffect(() => {
        if (!isUserAuthorized) {
            push(APP_PUBLIC_ROUTES.public.auth);
        }
    }, [isUserAuthorized, push]);

    return <>{children}</>;
}
