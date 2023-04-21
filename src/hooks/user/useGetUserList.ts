import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/service/query";
import { IUser } from "@/types";

interface UseGetUserListParams{
    userId:string | undefined,
    search: string
}


export default function useGetUserList(){
    const { "auth.token": token } = parseCookies();
    const {
        data: userList,
        isError: errorUserList,
        isLoading: userListIsLoading, 
        mutate: useGetUserListMutate
        } = useMutation({
            mutationFn: async (params:UseGetUserListParams ) => {
            return api.get(`/user/list/${params.userId}/${params.search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            }).then((resp: { data: IUser[]}) => resp.data)
            },
        }
    );
    return {userList, errorUserList, userListIsLoading,useGetUserListMutate}
}
        