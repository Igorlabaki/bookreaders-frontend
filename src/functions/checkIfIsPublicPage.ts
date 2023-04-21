import { APP_PUBLIC_ROUTES } from "@/constants/protectedRouter";

export const checkIfIsPublicPage = (asPath: string): boolean => {
    const appPubLicRoutes= Object.values(APP_PUBLIC_ROUTES.public)
    
    return  appPubLicRoutes.includes(asPath)
}