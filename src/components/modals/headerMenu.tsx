import { destroyCookie } from "nookies";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ModalComponent } from "../util/modal";
import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { AiFillHome } from "react-icons/ai";

interface HeaderMenuModalProps {
    onClose: () => void;
}

export default function HeaderMenuModal({ onClose }: HeaderMenuModalProps) {
    const { authUser } = useRecoverUserData();

    return (
        <ModalComponent
            onClose={onClose}
            styleInternal="
                flex justify-center items-start border-[1px] bg-white
                flex-col absolute w-[200px] text-sm  shadow-2xl shadow-pattern
                rounded-tl-md rounded-b-md top-20  right-20 md:right-11"
            styleExternal="bg-trasparent text-blue-dark overflow-hidden  animate-openOpacity "
        >
            <div className="flex  flex-col overflow-hidden w-full">
                <ul className="w-full overflow-hidden">
                    <li
                        className="cursor-pointer flex justify-start items-start gap-3
                    hover:bg-blue-50 w-full h-full  rounded-b-md
                    py-2 px-3"
                    >
                        <BiLogOut size={20} className={`text-blue-dark`} />
                        <p
                            onClick={() => {
                                destroyCookie(null, "auth.token");
                                window.location.href = "/";
                            }}
                        >
                            Sign out
                        </p>
                    </li>
                </ul>
            </div>
        </ModalComponent>
    );
}
