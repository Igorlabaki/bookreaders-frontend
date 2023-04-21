"use client";

import "./globals.css";
import queryClient from "@/service/query";
import { usePathname } from "next/navigation";
import { HeaderCompoenent } from "@/components/header";
import { PublicRouter } from "@/components/publicRoute";
import { PrivateRouter } from "@/components/privateRoute";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { checkIfIsPublicPage } from "@/functions/checkIfIsPublicPage";
import MainMenuComponent from "@/components/header/mainMenu";
import LeftSideComponent from "@/components/leftSide/leftSide";
import RigthSideComponent from "@/components/rigthSide";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();
    const isPublicPage = checkIfIsPublicPage(pathName);
    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <body className="relative bg-blue-ligth">
                    <HeaderCompoenent />
                    <div className="flex    pt-[125px]  h-screen  md:m-auto">
                        {isPublicPage && (
                            <PublicRouter>
                                <div className="flex-1 w-[90%] md:w-[50%]">
                                    {children}
                                </div>
                            </PublicRouter>
                        )}

                        {!isPublicPage && (
                            <PrivateRouter>
                                <div className="flex-1 flex flex-col w-[90%] px-5 md:px-12 pb-24 gap-y-6 ">
                                    <div className="flex w-[100%] justify-start gap-x-10 ">
                                        <LeftSideComponent />
                                        <div className="flex flex-col flex-1 gap-y-4">
                                            <MainMenuComponent />
                                            {children}
                                        </div>
                                        <RigthSideComponent />
                                    </div>
                                </div>
                            </PrivateRouter>
                        )}
                    </div>
                </body>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </html>
    );
}
