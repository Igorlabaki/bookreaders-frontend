"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { INotifications } from "../../types";
import { AvatarComponent } from "../util/avatar";
import { ButtonComponent } from "../util/button";
import HeaderMenuModal from "../modals/headerMenu";
import { IoNotificationsSharp } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { HeaderMenuItemComponent } from "./headerMenuItem";
import { BsFillChatSquareFill } from "react-icons/bs";
import { NotificationModalComponent } from "../modals/notificationModal";
import moment from "moment";
import { ListNotificationComponent } from "../notification/listNotification";
import { BiBell } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";

export function HeaderMenuComponent() {
    const { push } = useRouter();
    const pathName = usePathname();
    const { authUser } = useRecoverUserData();
    const [headreMenuOpen, setHeaderMenuOpen] = useState<boolean>(false);
    const [] = useState();
    const [headreNotificationOpen, setHeaderNotificationOpen] =
        useState<boolean>(false);

    function handleCloseHeaderMenuOpen() {
        setHeaderMenuOpen(() => {
            return false;
        });
    }

    function handleCloseHeadeNotification() {
        setHeaderNotificationOpen(() => {
            return false;
        });
    }

    function handleOpenHeaderMenuOpen() {
        setHeaderMenuOpen(() => true);
    }

    function handleOpenHeaderNotificationOpen() {
        setHeaderNotificationOpen(() => true);
    }

    const newUserNotifications = authUser?.user_notifications.filter(
        (notification: INotifications) => {
            return notification.view === false;
        }
    );

    if (authUser) {
        return (
            <div className="flex justify-center items-center gap-x-10">
                <div
                    className="relative hidden md:flex"
                    onClick={() => handleOpenHeaderNotificationOpen()}
                >
                    <HeaderMenuItemComponent
                        icon={<BiBell size={25} className={`text-gray-500 `} />}
                        list={newUserNotifications}
                    />
                    {headreNotificationOpen && (
                        <NotificationModalComponent
                            onClose={() =>
                                setHeaderNotificationOpen(() => false)
                            }
                        >
                            <div className="bg-transparent w-full flex flex-col">
                                <ListNotificationComponent
                                    notificationsList={authUser?.user_notifications
                                        ?.filter(
                                            (notification: INotifications) => {
                                                return (
                                                    notification?.view === false
                                                );
                                            }
                                        )
                                        .slice(0, 5)}
                                />
                                <hr />
                                <ButtonComponent
                                    title="See all"
                                    onClick={() => {
                                        window.location.href = `/notification`;
                                    }}
                                    className="text-center font-bold text-blue-dark py-2 hover:bg-blue-100"
                                />
                            </div>
                        </NotificationModalComponent>
                    )}
                </div>
                <div
                    onClick={() => handleOpenHeaderMenuOpen()}
                    className={
                        "flex justify-start items-center gap-x-4 relative"
                    }
                >
                    <AvatarComponent
                        h="h-[50px]"
                        w="w-[50px]"
                        avatar={authUser.urlAvatar}
                        icon={<FaUser size={25} className={"text-blue-dark"} />}
                    />
                    <p className="font-semibold text-lg">
                        {authUser?.username}
                    </p>
                    <IoIosArrowUp
                        size={15}
                        onClick={() => {
                            setHeaderMenuOpen(!headreNotificationOpen);
                        }}
                        className={` mt-1 cursor-pointer
                    ${
                        !headreNotificationOpen
                            ? "rotate-180 duration-500"
                            : "rotate-[360deg] duration-500"
                    }`}
                    />
                    {headreMenuOpen && (
                        <HeaderMenuModal
                            onClose={() => handleCloseHeaderMenuOpen()}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <ButtonComponent
            className={`
                ${pathName.match("auth") && "bg-blue-dark text-white "}
                flex justify-center items-center
                border-[1px] border-blue-dark text-dark-blue
                h-[30px] w-[100px] rounded-lg cursor-pointer
                hover:bg-blue-dark hover:text-white hover:border-none duration-500 text-[14px] font-semibold
            `}
            title={"Login"}
            titleClassname={``}
            onClick={() => {
                push("/auth");
            }}
        />
    );
}
