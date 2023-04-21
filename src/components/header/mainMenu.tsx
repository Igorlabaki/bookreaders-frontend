import { checkIfIsPublicPage } from "@/functions/checkIfIsPublicPage";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { INotifications } from "@/types";
import { usePathname } from "next/navigation";
import React from "react";
import {
    BiBell,
    BiBook,
    BiBookAlt,
    BiBookBookmark,
    BiBookContent,
    BiBookOpen,
    BiCog,
    BiEnvelope,
    BiEnvelopeOpen,
    BiGroup,
    BiHomeAlt,
    BiLibrary,
    BiTrophy,
    BiUser,
} from "react-icons/bi";

export default function MainMenuComponent() {
    const { authUser } = useRecoverUserData();
    const pathName = usePathname();
    const isPublicPage = checkIfIsPublicPage(pathName);
    const newUserNotifications = authUser?.user_notifications.filter(
        (notification: INotifications) => {
            return notification.view === false;
        }
    );
    return (
        <div className="flex justify-center items-center md:gap-x-10 gap-x-1 shadow-pattern rounded-full py-3 w-[100%] mx-auto bg-white ">
            <div
                className={`h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500
                                        ${
                                            pathName === "/home" &&
                                            "bg-blue-dark text-white"
                                        }
                                        ${
                                            pathName != "/home" &&
                                            "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/home`;
                }}
            >
                <BiHomeAlt className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"} />
            </div>
            <div
                className={` h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500
                                        ${
                                            pathName.includes("/profile") &&
                                            "bg-blue-dark text-white"
                                        }
                                        ${
                                            !pathName.includes("/profile") &&
                                            "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/profile`;
                }}
            >
                <BiUser className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"} />
            </div>
            <div
                className={` h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500
                                        ${
                                            pathName.includes("/friends") &&
                                            "bg-blue-dark text-white"
                                        }
                                        ${
                                            !pathName.includes("/friends") &&
                                            "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/friends`;
                }}
            >
                <BiGroup className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"} />
            </div>
            <div
                className={` h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500
                                        ${
                                            pathName.includes("/bookshelve") &&
                                            "bg-blue-dark text-white"
                                        }
                                        ${
                                            !pathName.includes("/bookshelve") &&
                                            "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/bookshelve`;
                }}
            >
                <BiBook className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"} />
            </div>
            <div
                className={` h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500
                                        ${
                                            pathName.includes(
                                                "/achivemments"
                                            ) && "bg-blue-dark text-white"
                                        }
                                        ${
                                            !pathName.includes(
                                                "/achivemments"
                                            ) && "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/achivemments`;
                }}
            >
                <BiTrophy className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"} />
            </div>
            <div
                className={` h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500
                                        ${
                                            pathName.includes("/messages") &&
                                            "bg-blue-dark text-white"
                                        }
                                        ${
                                            !pathName.includes("/messages") &&
                                            "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/messages`;
                }}
            >
                {pathName.includes("/messages") ? (
                    <BiEnvelopeOpen
                        className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"}
                    />
                ) : (
                    <BiEnvelope
                        className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"}
                    />
                )}
            </div>

            <div
                className={` h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500 relative
                                        ${
                                            pathName.includes(
                                                "/notification"
                                            ) && "bg-blue-dark text-white"
                                        }
                                        ${
                                            !pathName.includes(
                                                "/notification"
                                            ) && "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/notification`;
                }}
            >
                <BiBell className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"} />
                {newUserNotifications && newUserNotifications?.length > 0 && (
                    <div
                        className="z-20 bg-red-400 p-2 text-sm rounded-full h-5 w-5 flex 
        justify-center items-center absolute top-[-0.5rem] right-[-0.5rem] "
                    >
                        <p className="text-white">
                            {newUserNotifications.length}
                        </p>
                    </div>
                )}
            </div>
            <div
                className={` h-10 w-10 flex justify-center items-center rounded-md  text-gray-500  duration-500
                                        ${
                                            pathName.includes("/settings") &&
                                            "bg-blue-dark text-white"
                                        }
                                        ${
                                            !pathName.includes("/settings") &&
                                            "hover:bg-gray-200"
                                        }
                                    `}
                onClick={() => {
                    window.location.href = `/settings`;
                }}
            >
                <BiCog className={"cursor-pointer md:h-7 md:w-7 w-6 h-6"} />
            </div>
        </div>
    );
}
