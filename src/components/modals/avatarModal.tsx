import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { ModalComponent } from "../util/modal";
import { ImageComponent } from "../util/image";
import { ButtonComponent } from "../util/button";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { useUpadateUserAvatar } from "@/hooks/user/useUpdateUserAvatar";
import { useCloudinaryUserAvatar } from "@/hooks/user/useCloudinaryUserAvatar";

interface AvatarModalProps {
    onClose: () => void;
}

export function AvatarModalComponent({ onClose }: AvatarModalProps) {
    const { authUser } = useRecoverUserData();
    const { urlAvatarMutate, avatarUrl } = useCloudinaryUserAvatar();
    const { userAvatarMutate, userAvatarIsLoading } = useUpadateUserAvatar();
    const [showStylePhotoButton, setShowSetstylePhotoButton] =
        useState<boolean>(false);
    return (
        <ModalComponent
            onClose={() => onClose && onClose()}
            styleInternal="w-full h-full p-10 flex justify-center items-center"
        >
            <div
                className="bg-white  flex justify-start items-center flex-col relative w-[90%] md:h-[500px] md:w-[400px] space-y-10
            py-10 rounded-lg overflow-hidden px-10"
            >
                <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
                    <IoIosClose
                        size={25}
                        className={"text-blue-dark cursor-pointer"}
                        onClick={() => onClose && onClose()}
                    />
                </div>
                {avatarUrl ? (
                    <ImageComponent
                        alt="user avatar"
                        h="h-[12  0px] md:h-[150px]"
                        w="w-[120px] md:w-[150px]"
                        src={avatarUrl.url}
                        containerClassname={"rounded-full overflow-hidden"}
                    />
                ) : authUser?.urlAvatar ? (
                    <ImageComponent
                        alt="user avatar"
                        h="h-[120px] md:h-[150px]"
                        w="w-[120px] md:w-[150px]"
                        src={authUser?.urlAvatar}
                        containerClassname={"rounded-full overflow-hidden"}
                    />
                ) : (
                    <div className="bg-gray-300 rounded-full p-5">
                        <FaReact size={80} className={"text-gray-800"} />
                    </div>
                )}
                <div className="relative flex flex-col justify-center w-full items-center">
                    <div
                        className={`
                        ${
                            showStylePhotoButton
                                ? "bg-gray-200"
                                : "bg-transparent"
                        }
                    flex gap-x-3 justify-center items-center rounded-full p-2 px-4`}
                    >
                        <MdOutlineAddAPhoto
                            size={30}
                            className={
                                "text-desaturatedDarkCyan cursor-pointer text-blue-dark "
                            }
                        />
                        <p className=" w-[150px] flex  justify-center items-center">
                            Choose your photo
                        </p>
                    </div>
                    <input
                        type="file"
                        className="absolute top-3 opacity-0 left-5 w-full cursor-pointer hover:bg-blue-100 "
                        onMouseOver={() =>
                            setShowSetstylePhotoButton(() => true)
                        }
                        onMouseOut={() =>
                            setShowSetstylePhotoButton(() => false)
                        }
                        onChange={(e) => {
                            if (e.target.files) {
                                urlAvatarMutate(e.target.files[0]);
                            }
                        }}
                    />
                    <div className="flex justify-center items-center gap-1 mt-2">
                        <p className="text-gray-500">File name:</p>
                        {avatarUrl ? (
                            <p>{avatarUrl.original_filename}</p>
                        ) : (
                            <p>No file choosed</p>
                        )}
                    </div>
                </div>
                <ButtonComponent
                    title={userAvatarIsLoading ? "Loading" : "Upload Photo"}
                    className="bg-blue-dark text-white 
                    py-2 px-4 rounded-md mt-5 shadow-lg w-full font-semibold"
                    onClick={() => {
                        userAvatarMutate(avatarUrl?.url);
                    }}
                />
            </div>
        </ModalComponent>
    );
}
