"use client";

import { ReactNode } from "react";

interface IRootLayoutProps {
    children: ReactNode;
    params: { id: string };
}

export default function RootLayout({ children, params }: IRootLayoutProps) {
    return <div className="flex flex-col gap-y-12">{children}</div>;
}
