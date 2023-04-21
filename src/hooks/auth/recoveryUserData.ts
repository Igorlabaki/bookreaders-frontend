import { IUser } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import queryClient from "@/service/query";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function useRecoverUserData(){
    const { push } = useRouter();
    const { "auth.token": token } = parseCookies();

    const {
        data: authUser,
        error: errorAuthUser,
        isError: isErrorAuthUser,
        isLoading: authUserDataIsLoading,
    } =  useQuery({
            queryKey: ["recoveryAccountData",token],
            queryFn: async () =>  {
            return api
            .get("/auth/recoveryAccountData", {
                headers: {
                    Authorization: `token ${token}`,
                },
            })
            .then((resp: { data: IUser}) => {
                return resp.data;
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["postList"])
        }
    })

    return {authUser, isErrorAuthUser,authUserDataIsLoading, errorAuthUser,token}
}

