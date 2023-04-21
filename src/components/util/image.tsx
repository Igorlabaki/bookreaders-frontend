import React from "react";
import Image from "next/legacy/image";

interface ImageComponentProps {
    w: string;
    h: string;
    src: string;
    alt: string;
    onclik?: () => void;
    imageClassname?: string;
    containerClassname?: string;
}

export function ImageComponent({
    w,
    h,
    src,
    alt,
    onclik,
    imageClassname,
    containerClassname,
}: ImageComponentProps) {
    return (
        <div className={`${w} ${h} relative ${containerClassname}`}>
            <Image
                src={src}
                priority
                alt={alt}
                layout="fill"
                objectFit={"cover"}
                className={`h-full w-full ${imageClassname}`}
                onClick={() => onclik && onclik()}
            />
        </div>
    );
}
