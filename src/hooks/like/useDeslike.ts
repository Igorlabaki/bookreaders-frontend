import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { ICreatPostParams, ILikeParams, IPost } from "@/types";
import queryClient from "@/service/query";

export default function useDeslike(){
    const { "auth.token": token } = parseCookies();

    const {
        data: deslike,
        isError: erroDeslike,
        isLoading: deslikeIsLoading,
        mutate: deslikeMutate
        } = useMutation({
            mutationFn: (bodyReq: ILikeParams) => {
                return   api
                .post("/like/delete", bodyReq, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["postList"])
            }
        }
    )

    return {deslike, erroDeslike, deslikeIsLoading, deslikeMutate}
}
