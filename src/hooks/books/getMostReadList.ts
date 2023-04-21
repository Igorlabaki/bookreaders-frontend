import { IBookBd, IGoogleBook, IMostReadBookResponse } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetMostReadList(){
    const { "auth.token": token } = parseCookies();
    const {
        data: mostReadList,
        error: errorMostReadList,
        isError: isErrorMostReadList,
        isLoading:mostReadListDataIsLoading,
    } =  useQuery({
            queryKey: ["mostReadList"],
            queryFn: async () =>  {
            return await api
            .get(`/userBook/mostReadList`)
            .then(async (resp: { data: IMostReadBookResponse[]}) => {
                const mostReadList =  await Promise.all(
                    resp.data.map(async (item: IMostReadBookResponse) => {
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
                return mostReadList;
            })
        },
    })

    return {mostReadList, errorMostReadList,isErrorMostReadList, mostReadListDataIsLoading}
}
