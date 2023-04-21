import React from "react";

interface ProgressBarProps {
    percentegeCompleted: number;
}

export default function ProgressBarComponent({
    percentegeCompleted,
}: ProgressBarProps) {
    return (
        <div className=" flex justify-start items-center gap-x-3">
            <div
                className={`bg-gray-200 rounded-sm overflow-hidden w-[130px] h-3`}
            >
                <div
                    className={`${
                        percentegeCompleted >= 100
                            ? "bg-green-500"
                            : "bg-blue-400"
                    } h-full `}
                    style={{ width: `${percentegeCompleted}%` }}
                />
            </div>
            <p
                className={`text-sm font-semibold
                ${
                    percentegeCompleted &&
                    percentegeCompleted >= 100 &&
                    "text-green-600"
                }
            `}
            >
                {percentegeCompleted}%
            </p>
        </div>
    );
}
