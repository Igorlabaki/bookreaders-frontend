import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { ICreatPostParams, ILikeParams, IPost } from "@/types";
import queryClient from "@/service/query";

export default function useUserBookDelete(){
    const { "auth.token": token } = parseCookies();

    const {
        data: userBookDeleted,
        isError: erroUserBookDeleted,
        isLoading: userBookDeletedIsLoading,
        mutate: userBookDeleteMutate
        } = useMutation({
            mutationFn: (userBookId: string) => {
                return   api
                .delete(`/userBook/deleteById/${userBookId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
},
                })
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["recoveryAccountData"])
            }
        }
    )

    return {userBookDeleted, erroUserBookDeleted, userBookDeletedIsLoading, userBookDeleteMutate}
}
