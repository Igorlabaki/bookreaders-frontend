import { IBookBd, IMostPostedBookResponse } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetMostPostedBookList(){
    const { "auth.token": token } = parseCookies();
    const {
        data: mostPostedList,
        error: errorMostPostedList,
        isError: isErrorMostPostedList,
        isLoading:mostPostedListDataIsLoading,
    } =  useQuery({
            queryKey: ["mostPostedList"],
            queryFn: async () =>  {
            return await api
            .get(`/post/mostPostedBookList`)
            .then(async (resp: { data: IMostPostedBookResponse[]}) => {
                const mostPostedList =  await Promise.all(
                    resp.data.map(async (item: IMostPostedBookResponse) => {
                        let count = item._count.book_id;
                        let book = await api.get(`/book/getById/${item.book_id}`, {
                            headers: {
                            Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((resp: { data: IBookBd}) => {
                            return resp.data;
                        })
                        
                        return { book, count };
                    })
                );
                return mostPostedList;
            })
        },
    })

    return {mostPostedList, errorMostPostedList,isErrorMostPostedList, mostPostedListDataIsLoading}
}
