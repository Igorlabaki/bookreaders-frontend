import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";
import { IBookBd, IPost, IRankingBooListkResponse } from "@/types";
import { parseCookies } from "nookies";
import queryClient from "@/service/query";

export default function useGetRankingBookList(){
    const { "auth.token": token } = parseCookies();
    const {
        data: rankingBookList,
        isError: errorRankingBookList,
        isLoading: errorRankingBookListIsLoading, 
        } = useQuery({
                queryKey: ["rankingBookList"],
                queryFn: async () => {
                return api.get(`/userBook/rankingBookList`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        },
                }).then(async (resp: { data: IRankingBooListkResponse[]}) => {
                    const rankingBookList =  await Promise.all(
                        resp.data.map(async (item: IRankingBooListkResponse) => {
                            let count = item._avg.rate;
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
                    return rankingBookList;
                })
            },
        }
    );
    return {rankingBookList, errorRankingBookList, errorRankingBookListIsLoading}
}
        