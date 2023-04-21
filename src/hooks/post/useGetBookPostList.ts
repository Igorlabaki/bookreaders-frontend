import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useGetBookPostBookList(){
    const { "auth.token": token } = parseCookies();
    const {
        data: postBookList,
        isError: errorPostBookList,
        isLoading: postBookListIsLoading, 
        mutate: postBookListMutate
        } = useMutation({
            mutationFn: (bookId:string | undefined) => {
                return api.get(`/post/listBook/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        },
                }).then((resp) => resp.data)
            }
        },
    );
    return {postBookList, errorPostBookList, postBookListIsLoading,postBookListMutate}
}
        

