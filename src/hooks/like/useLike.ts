import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { ICreatPostParams, ILikeParams, IPost } from "@/types";
import queryClient from "@/service/query";

export default function useLike(){
    const { "auth.token": token } = parseCookies();
   
    const {
        data: like,
        isError: erroLike,
        isLoading: likeIsLoading,
        mutate: likeMutate
        } = useMutation({
            mutationFn: (bodyReq: ILikeParams) => {
                return   api
                .post("/like/create", bodyReq, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["postList"])
                queryClient.invalidateQueries(["notificationById",])
                queryClient.invalidateQueries(["recoveryAccountData"])
            }
        }
    )

    return {like, erroLike, likeIsLoading, likeMutate}
}
