import { parseCookies } from "nookies";

export function isUserAuthenticated(){
    const { "auth.token": token } = parseCookies();

    if(token){
        return true
    }

    return false
}