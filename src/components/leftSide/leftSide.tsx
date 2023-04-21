import { useRecoverUserData } from "@/hooks/auth/recoveryUserData";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";
import { CommunityComponent } from "../community";
import { AvatarComponent } from "../util/avatar";
import CardComponent from "../util/card";
import { BioComponent } from "./bioComponent";
import ReadingChallengeComponent from "./readingChallenge";

export default function LeftSideComponent() {
    const pathName = usePathname();

    return (
        <div className="w-[20%] flex flex-col gap-y-4 relative">
            {pathName.includes("profile") && <BioComponent />}
            <ReadingChallengeComponent />
            {!pathName.includes("profile") && <CommunityComponent />}
        </div>
    );
}
