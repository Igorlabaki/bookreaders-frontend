import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserPostUserList(userId:string | undefined){
    const { "auth.token": token } = parseCookies();
    const {
        data: postUserList,
        isError: errorPostUserList,
        isLoading: postUserListIsLoading, 
        } = useQuery({
                queryKey: ["postUserList"],
                queryFn: async () => {
                return api.get(`/post/listUser/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        },
                }).then((resp) => resp.data)
            },
        }
    );
    return {postUserList, errorPostUserList, postUserListIsLoading}
}
        