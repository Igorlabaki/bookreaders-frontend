import { IUser } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function useGetUserById(id: string | string[] | undefined){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: userById,
        error: errorUserById,
        isError: isErrorUserById,
        isLoading: userByIdDataIsLoading,
    } =  useQuery({
            queryKey: ["userById",token],
            queryFn: async () =>  {
            return await api
            .get(`/user/getById/${id}`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            })
            .then((resp: { data: IUser}) => {
                return resp.data;
            })
        },
    })

    return {userById, errorUserById,isErrorUserById, userByIdDataIsLoading}
}
