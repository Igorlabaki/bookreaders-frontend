import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { useCreateChallenge } from "@/hooks/challenge/useCreateChallenge";
import { useDeleteChallenge } from "@/hooks/challenge/useDeleteChallenge";
import { useUpdateGoalChallengent } from "@/hooks/challenge/useUpdateGoalChallengent";
import React, { useEffect, useState } from "react";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { ButtonComponent } from "../util/button";
import CardComponent from "../util/card";
import { ImageComponent } from "../util/image";
import ProgressBarComponent from "../util/progressBar";

export default function ReadingChallengeComponent() {
    const { authUser } = useRecoverUserData();
    const { createChallengeMutate } = useCreateChallenge();
    const { deleteChallengeMutate } = useDeleteChallenge();
    const { updateGoalChallengeMutate } = useUpdateGoalChallengent();
    const [booksChallegeNumber, setBooksChallegeNumber] = useState(
        authUser?.Challenge?.goal
    );
    const [progressBar, setProgressBar] = useState();
    const [isEditBookChallegeTrue, setIsEditBookChallegeTrue] =
        useState<boolean>(false);
    const [hoverChallengeCardIsTrue, setHoverChallengeCardIsTrue] =
        useState<boolean>(false);

    useEffect(() => {
        setProgressBar(() =>
            (
                (authUser?._count?.books * 100) /
                authUser?.Challenge?.goal
            ).toFixed()
        );
    }, [authUser]);
    return (
        <CardComponent>
            <div
                className="relative flex flex-col gap-y-4"
                onMouseOver={() => setHoverChallengeCardIsTrue(true)}
                onMouseOut={() => setHoverChallengeCardIsTrue(false)}
            >
                <div className="relative flex items-center justify-start">
                    <p className="flex items-center justify-start w-full font-semibold text-gray-700">
                        Reading Challenge 2023
                    </p>

                    {authUser?.Challenge && hoverChallengeCardIsTrue && (
                        <div className="absolute flex items-center justify-end space-x-1 top2 right-1">
                            <div
                                className={` rounded-md p-1  ${
                                    isEditBookChallegeTrue &&
                                    "bg-blue-dark text-white"
                                }
                        ${
                            !isEditBookChallegeTrue &&
                            "hover:bg-gray-200 text-gray-600"
                        }`}
                            >
                                <BiEditAlt
                                    size={18}
                                    className={`cursor-pointer  rounded-full
                    `}
                                    onClick={() =>
                                        setIsEditBookChallegeTrue(
                                            !isEditBookChallegeTrue
                                        )
                                    }
                                />
                            </div>
                            <div
                                className={` rounded-md p-1  
                        hover:bg-gray-200 text-gray-400"
                        `}
                            >
                                <BiTrashAlt
                                    size={15}
                                    className={`cursor-pointer  rounded-full
                    `}
                                    onClick={() =>
                                        deleteChallengeMutate(
                                            authUser?.Challenge.id
                                        )
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-start">
                    {isEditBookChallegeTrue ? (
                        <div className="flex flex-col gap-y-4">
                            <div className="flex items-center justify-start gap-x-1">
                                <p className="font-semibold text-gray-600">
                                    I want read
                                </p>
                                <input
                                    type="number"
                                    value={booksChallegeNumber}
                                    className=" outline-none border-0 bg-gray-100 font-semibold h-8 rounded-md px-3 py-1 w-[80px]"
                                    min={0}
                                    max={300}
                                    onChange={(e) =>
                                        setBooksChallegeNumber(
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                                <p className="font-semibold text-gray-600">
                                    books in 2023
                                </p>
                            </div>
                            <div className="flex items-center justify-start gap-x-3">
                                <ButtonComponent
                                    title="Cancel"
                                    className="bg-red-400  py-1 text-sm flex justify-center px-2 shadow-pattern hover:shadow-none
            rounded-md font-semibold hover:brightness-125 text-white w-[130px]  relative cursor-pointer"
                                    onClick={() =>
                                        setIsEditBookChallegeTrue(false)
                                    }
                                />
                                <ButtonComponent
                                    title="Update"
                                    className="bg-blue-dark py-1 text-sm flex justify-center px-2 shadow-pattern hover:shadow-none
            rounded-md font-semibold hover:brightness-125 text-white w-[130px]  relative cursor-pointer"
                                    onClick={() => {
                                        updateGoalChallengeMutate({
                                            goal: booksChallegeNumber,
                                            challengeId:
                                                authUser?.Challenge?.id,
                                        });
                                        setIsEditBookChallegeTrue(false);
                                    }}
                                />
                            </div>
                        </div>
                    ) : authUser?.Challenge ? (
                        <div className="flex items-start justify-start space-x-4">
                            {authUser?.Challenge?.complete ? (
                                <ImageComponent
                                    containerClassname="overflow-hidden rounded-sm "
                                    alt="challenge"
                                    h="h-[120px]"
                                    w="w-[110px]"
                                    src="/images/brand-icons/challengeComplete.png"
                                />
                            ) : (
                                <ImageComponent
                                    containerClassname="overflow-hidden rounded-sm"
                                    alt="challenge"
                                    h="h-[120px]"
                                    w="w-[110px]"
                                    src="/images/brand-icons/challenge.png"
                                />
                            )}

                            <div className="flex flex-col h-[120px] justify-end">
                                <div className="flex items-end justify-start gap-x-5">
                                    <p className="text-4xl font-semibold">
                                        {authUser?._count.books}
                                    </p>
                                    <p className="mb-2 text-sm">{`/ ${authUser?.Challenge?.goal}`}</p>
                                </div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Books completed!
                                </p>
                                {progressBar && (
                                    <div className="flex items-center justify-start gap-x-5">
                                        {" "}
                                        <ProgressBarComponent
                                            percentegeCompleted={progressBar}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start justify-start gap-y-2">
                            <p className="text-sm">
                                Challenge yourself to read more this year!
                            </p>
                            <div className="flex items-center justify-start gap-x-2">
                                <input
                                    type="number"
                                    placeholder="10"
                                    value={booksChallegeNumber}
                                    className=" outline-none border-0 bg-gray-100 font-semibold h-8 rounded-md px-3 py-1 w-[80px]"
                                    min={0}
                                    max={300}
                                    onChange={(e) =>
                                        setBooksChallegeNumber(
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                                <p className="text-sm">books!</p>
                            </div>
                            <ButtonComponent
                                title="Start Challenge"
                                className="bg-blue-dark shadow-lg  py-1 text-sm flex justify-center px-2
                        rounded-md font-semibold hover:brightness-125 text-white w-[200px]  relative cursor-pointer
                        "
                                onClick={() => {
                                    createChallengeMutate({
                                        userId: authUser?.id,
                                        goal: booksChallegeNumber,
                                    });
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </CardComponent>
    );
}
