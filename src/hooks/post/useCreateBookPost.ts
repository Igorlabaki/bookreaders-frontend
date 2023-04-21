import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/service/query";
import { ICreateBookPostParams, IPost } from "@/types";

export default function useCreateBookPost(){
    const { "auth.token": token } = parseCookies();

    const {
        data: bookpost,
        isError: erroNewBookPost,
        isLoading: newBookPostIsLoading,
        mutate: createBookPostMutate
        } = useMutation({
            mutationFn: (bodyReq: ICreateBookPostParams) => {
                return   api
                .post("/book/create", bodyReq, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp : { data: IPost}) => {
                    return resp.data
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["postList"])
                queryClient.invalidateQueries(["recoveryAccountData"])
            }
        }
    )

    return {bookpost, erroNewBookPost, newBookPostIsLoading, createBookPostMutate}
}
