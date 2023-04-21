import { IUser, IUserBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/service/query";


interface bodyReq{
    userBookId: string,
    favorite: boolean,
}

export function useUpdateFavorite(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: UpdateFavorite,
        error: errorUpdateFavorite,
        isError: isErrorUpdateFavorite,
        isLoading: UpdateFavoriteDataIsLoading,
        mutate: updateFavoriteMutate
    } =  useMutation({
            mutationFn: async (bodyReq: bodyReq) =>  {
            return await api
            .put(`/userBook/updateFavorite`, bodyReq
                ,{
                headers: {
                    Authorization: `token ${token}`,
                },
            })
            .then((resp) => {
                return resp.data;
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["recoveryAccountData"])
        }
    })

    return {UpdateFavorite, errorUpdateFavorite,isErrorUpdateFavorite, UpdateFavoriteDataIsLoading,updateFavoriteMutate}
}
