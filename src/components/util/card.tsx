import React from "react";

interface CardComponentProps {
    overflow?: string;
    children: React.ReactNode;
}

export default function CardComponent({
    children,
    overflow,
}: CardComponentProps) {
    return (
        <div
            className={`bg-white shadow-pattern p-3  rounded-md overflow-${overflow} animate-openOpacity`}
        >
            {children}
        </div>
    );
}
