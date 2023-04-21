import {
    SiTailwindcss,
    SiJavascript,
    SiReact,
    SiPrisma,
    SiNodedotjs,
    SiLinkedin,
    SiGithub,
    SiGmail,
} from "react-icons/si";
import { ButtonComponent } from "./button";

export function InfoComponent() {
    return (
        <div
            className="flex flex-col space-y-5 md:space-y-0 items-start justify-center w-[95%] md:w-[900px]
        md:items-center md:flex-row mt-10 md:justify-around px-2 py-4 md:py-2 
        rounded-md border-[1px] border-gray-400 gap-x-4 absolute bottom-2 md:bottom-10 bg-white shadow-pattern"
        >
            <div className="flex gap-x-[52px] md:gap-x-3 ">
                <p className=" text-gray-500">Coded By:</p>
                <p>Igor A Labaki Goncalo</p>
            </div>
            <div className="flex gap-x-3 justify-center  items-center">
                <p className=" text-gray-500">Developed with :</p>
                <div className="flex gap-x-4">
                    <div className=" p-1 rounded-md w-8 flex justify-center items-center bg-green-100">
                        <ButtonComponent
                            icon={
                                <SiNodedotjs
                                    className="text-green-700"
                                    size={25}
                                />
                            }
                        />
                    </div>
                    <div className="bg-blue-100 p-1 rounded-md w-8 flex justify-center items-center">
                        <ButtonComponent
                            icon={
                                <SiTailwindcss
                                    className="text-blue-400"
                                    size={25}
                                />
                            }
                        />
                    </div>
                    <ButtonComponent
                        icon={
                            <SiJavascript
                                className="text-yellow-500 rounded-md"
                                size={31}
                            />
                        }
                    />
                    <div className="bg-gray-800 p-1 rounded-md w-8 flex justify-center items-center">
                        <ButtonComponent
                            icon={
                                <SiReact className="text-blue-300" size={25} />
                            }
                        />
                    </div>
                    <div className="bg-black p-1 rounded-md w-8 flex justify-center items-center">
                        <ButtonComponent
                            icon={<SiPrisma className="text-white" size={18} />}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-x-[78px] md:gap-x-3 ">
                <p className=" text-gray-500">Links:</p>
                <div className="flex gap-x-3">
                    <SiLinkedin
                        className="cursor-pointer text-blue-700"
                        size={27}
                    />
                    <SiGithub className="cursor-pointer text-black" size={27} />
                    <SiGmail
                        className="cursor-pointer text-red-700"
                        size={27}
                    />
                </div>
            </div>
        </div>
    );
}
