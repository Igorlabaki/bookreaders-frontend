import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IGetUserMutateParams } from "@/types";
import queryClient from "@/service/query";

export default function useGetUserSearchList(){
    const { "auth.token": token } = parseCookies();
 
    const {
        data: userList,
        isError: errorUserList,
        isLoading: userListIsLoading, 
        mutate: mutationListFriends
        } = useMutation({
            mutationFn: async ({userId,search}:IGetUserMutateParams) => {
            return api.get(`/user/list/${search}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            }).then((resp) => resp.data)
            },
       
        }
    );
    return {userList, errorUserList, userListIsLoading,mutationListFriends}
}
        