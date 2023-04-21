import { IUser, IUserBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/service/query";


interface bodyReq{
    userBookId: string,
    pagesRead: number
    text?: string
    percentageReadBook?: number | null | undefined,
    totalPage?: number | null | undefined
    rate?: number
}

export function useUpdateBookPage(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: UpdatePageRead,
        error: errorUpdatePageRead,
        isError: isErrorUpdatePageRead,
        isLoading: UpdatePageReadDataIsLoading,
        mutate: updatePageReadMutate
    } =  useMutation({
            mutationFn: async (bodyReq: bodyReq) =>  {
            return await api
            .put(`/userBook/updatePageRead`, bodyReq
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

    return {UpdatePageRead, errorUpdatePageRead,isErrorUpdatePageRead, UpdatePageReadDataIsLoading,updatePageReadMutate}
}
