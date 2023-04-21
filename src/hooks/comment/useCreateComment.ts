import { IComment, ICreateCommentParams } from "@/types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import queryClient from "@/service/query";
import { useMutation } from "@tanstack/react-query";
import useGetBookPostBookList from "../post/useGetBookPostList";

export  function useCreateComment(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: comment,
        isError: erroNewComment,
        isLoading: newCommentIsLoading,
        mutate: createcommentMutate
        } = useMutation({
            mutationFn: (bodyReq: ICreateCommentParams) => {
                return   api
                .post("/comment/create", bodyReq, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp : { data: IComment}) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["postList"])
                queryClient.invalidateQueries(["notificationById"])
                queryClient.invalidateQueries(["recoveryAccountData"])
            }
        }
    )

    return {comment, erroNewComment, newCommentIsLoading, createcommentMutate}
}
