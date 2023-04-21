import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { useGetUserById } from "@/hooks/user/getUserById";
import { useUpadateUserBio } from "@/hooks/user/useUpdateUserBio";
import React, { useState } from "react";
import {
    BiBook,
    BiBookBookmark,
    BiEditAlt,
    BiGroup,
    BiTrashAlt,
} from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { AvatarModalComponent } from "../modals/avatarModal";
import { AvatarComponent } from "../util/avatar";
import { ButtonComponent } from "../util/button";
import CardComponent from "../util/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { spawn } from "child_process";

const createInfoFormSchema = z.object({
    bio: z.string(),
    username: z.string().nonempty("Username is required"),
});

type CreateInfoFormData = z.infer<typeof createInfoFormSchema>;

export function BioComponent() {
    const { authUser } = useRecoverUserData();
    const [textInput, setTextInput] = useState<string>("");
    const [uploadPhotoModal, setUploadPhotoModal] = useState<boolean>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editBioIconShow, setEditBioIconShow] = useState<boolean>(false);
    const [showButtonUploadPhoto, setShowButtonUploadPhoto] =
        useState<boolean>(false);

    function handleCloseCploadPhotoModal() {
        setUploadPhotoModal(() => false);
    }

    function handleOpenUploadPhotoModal() {
        setUploadPhotoModal(() => true);
    }
    const { userBioMutate } = useUpadateUserBio();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateInfoFormData>({
        resolver: zodResolver(createInfoFormSchema),
    });

    function handleFormSubmit(data: { username: string; bio: string }) {
        setTextInput("");
        userBioMutate({
            bio: data.bio,
            username: data.username,
        });
        setEditMode(false);
    }
    return (
        <CardComponent>
            <div
                className="flex flex-col items-center justify-center pt-10 gap-y-3"
                onMouseOver={() => setEditBioIconShow(true)}
                onMouseOut={() => setEditBioIconShow(false)}
            >
                {editBioIconShow || editMode ? (
                    <div className="absolute flex items-center justify-end space-x-1 top-2 right-1 animate-openOpacity">
                        <div
                            className={` rounded-md p-1 
                           
                            ${editMode && "bg-blue-dark text-white"}
                    ${!editMode && "hover:bg-gray-200 text-gray-600"}
                                    `}
                        >
                            <BiEditAlt
                                size={18}
                                className={`cursor-pointer  rounded-full
                    `}
                                onClick={() => setEditMode(!editMode)}
                            />
                        </div>
                    </div>
                ) : null}
                <div
                    className=" overflow-hidden h-[70px] md:h-[140px] z-10 w-[70px]  md:w-[140px] rounded-full relative flex justify-center items-center"
                    onMouseOver={() => setShowButtonUploadPhoto(() => true)}
                    onMouseOut={() => setShowButtonUploadPhoto(() => false)}
                >
                    <AvatarComponent
                        avatar={authUser?.urlAvatar}
                        h={"h-[70px] md:h-[140px]"}
                        w={"w-[70px]  md:w-[140px]"}
                        icon={
                            <FaUser
                                className={
                                    "text-blue-dark text-[30px] md:text-[50px]"
                                }
                            />
                        }
                    />
                    <div
                        className={`${
                            showButtonUploadPhoto || editMode
                                ? "flex"
                                : "hidden"
                        }
                bg-blue-dark w-full absolute h-6 bottom-0 z-30
                cursor-pointer justify-center items-start animate-openOpacity`}
                        onClick={() => {
                            handleOpenUploadPhotoModal();
                        }}
                    >
                        <p
                            className="text-white flex justify-center items-start h-full text-[9px]
                        font-semibold"
                        >
                            Update photo
                        </p>
                    </div>
                </div>
                {authUser?.username && !editMode ? (
                    <div className="flex flex-col items-center justify-center w-full gap-y-3">
                        <p className="text-[25px] font-bold text-blue-dark">
                            {authUser?.username}
                        </p>
                        <p className="w-full px-2 py-1 font-semibold text-gray-500 rounded-md text-start bg-gray-50">
                            {authUser.bio}
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="flex flex-col items-center justify-center flex-1 w-full gap-1 font-semibold text-gray-500 animate-openOpacity"
                    >
                        <input
                            type="text"
                            placeholder={authUser?.username || "username"}
                            className={`w-full rounded-lg  py-2 px-3
                        bg-gray-100 text-gray-500 font-semibold
                        outline-none  resize-none
                        ${errors.username && "border-2 border-red-100"}   
                        `}
                            {...register("username")}
                        />
                        {errors.username && (
                            <span className="w-full text-[12px] text-red-500">
                                {errors?.username.message}
                            </span>
                        )}
                        <div className="w-full">
                            <textarea
                                placeholder={
                                    authUser?.bio || "Write your bio..."
                                }
                                maxLength={100}
                                className={`w-full rounded-lg  py-2 px-3 h-[120px]
                                bg-gray-100 text-gray-500 font-semibold
                                outline-none  resize-none`}
                                {...register("bio")}
                            />
                        </div>
                        <div className="flex items-center justify-start w-full gap-x-2">
                            <ButtonComponent
                                title="Save"
                                className="flex justify-center px-2 py-1 text-sm font-semibold text-white rounded-md cursor-pointer bg-blue-dark shadow-pattern hover:shadow-none hover:brightness-125 w-[50%]"
                                type="submit"
                            />
                            <ButtonComponent
                                title="Cancel"
                                className="flex justify-center px-2 py-1 text-sm font-semibold text-white bg-red-300 rounded-md cursor-pointer shadow-pattern hover:shadow-none hover:brightness-125 w-[50%]"
                                onClick={() => setEditMode(false)}
                            />
                        </div>
                    </form>
                )}
            </div>
            {uploadPhotoModal && (
                <AvatarModalComponent
                    onClose={() => handleCloseCploadPhotoModal()}
                />
            )}
        </CardComponent>
    );
}
