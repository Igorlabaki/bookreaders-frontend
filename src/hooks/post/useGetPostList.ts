import { api } from "../../service/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IPost } from "@/types";
import { parseCookies } from "nookies";
import queryClient from "@/service/query";

export default function useGetPostList(){
    const { "auth.token": token } = parseCookies();
    const {
        data: postList,
        isError: errorPostList,
        isLoading: postListIsLoading, 
        mutate: getpostList
        } = useMutation({
                mutationFn: async (userId:string | undefined) => {
                return api.get(`/post/list/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        },
                }).then((resp) => resp.data)
            },
        }
    );
    return {postList, errorPostList, postListIsLoading,getpostList}
}
        