import { IBookBd, IGoogleBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetMostFavoriteList(){
    const { "auth.token": token } = parseCookies();
    const {
        data: mostFavoriteList,
        error: errorMostFavoriteList,
        isError: isErrorMostFavoriteList,
        isLoading:mostFavoriteListDataIsLoading,
    } =  useQuery({
            queryKey: ["mostFavoriteList"],
            queryFn: async () =>  {
            return await api
            .get(`/userBook/mostFavoriteList`)
            .then(async (resp: { data: any[]}) => {
                const mostFavoriteList =  await Promise.all(
                    resp.data.map(async (item: any) => {
                        let count = item._count.fk_id_book;
                        let book = await api.get(`/book/getById/${item.fk_id_book}`, {
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
                return mostFavoriteList;
            })
        },
    })

    return {mostFavoriteList, errorMostFavoriteList,isErrorMostFavoriteList, mostFavoriteListDataIsLoading}
}
