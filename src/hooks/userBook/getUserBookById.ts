import { IUser, IUserBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function useGetUserBookById(id: string | string[] | undefined){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: userBookById,
        error: errorUserBookById,
        isError: isErrorUserBookById,
        isLoading: userBookByIdDataIsLoading,
    } =  useQuery({
            queryKey: ["userBookById",token],
            queryFn: async () =>  {
            return await api
            .get(`/userBook/getUserBookById/${id}`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            })
            .then((resp: { data: IUserBook}) => {
                return resp.data;
            })
        },
    })

    return {userBookById, errorUserBookById,isErrorUserBookById, userBookByIdDataIsLoading}
}
