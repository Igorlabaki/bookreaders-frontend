import { IGoogleBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetBookById(id: string | string[] | undefined){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: bookById,
        error: errorBookById,
        isError: isErrorBookById,
        isLoading: bookByIdDataIsLoading,
    } =  useQuery({
            queryKey: ["bookById",token],
            queryFn: async () =>  {
            return await api
            .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then((resp: { data: IGoogleBook}) => {
                return resp.data;
            })
        },
    })

    return {bookById, errorBookById,isErrorBookById, bookByIdDataIsLoading}
}
