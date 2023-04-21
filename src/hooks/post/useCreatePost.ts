import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation } from "@tanstack/react-query";
import { ICreatPostParams, IPost } from "@/types";
import queryClient from "@/service/query";

export default function useCreatePost(){
    const { "auth.token": token } = parseCookies();

    const {
        data: post,
        isError: erroNewPost,
        isLoading: newPostIsLoading,
        mutate: createPostMutate
        } = useMutation({
            mutationFn: (bodyReq: ICreatPostParams) => {
                return   api
                .post("/post/create", bodyReq, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp : { data: IPost}) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["postList"])
                queryClient.invalidateQueries(["postList"])
            }
        }
    )

    return {post, erroNewPost, newPostIsLoading, createPostMutate}
}
