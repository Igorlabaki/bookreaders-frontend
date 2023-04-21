import { IUser, IUserBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/service/query";


interface bodyReq{
    userBookId: string,
    listType: string,
    action?: string
    text?: string
    rate?: number
}

export function useUpdateListType(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: UpdateListType,
        error: errorUpdateListType,
        isError: isErrorUpdateListType,
        isLoading: UpdateListTypeDataIsLoading,
        mutate: updateListTypeMutate
    } =  useMutation({
            mutationFn: async (bodyReq: bodyReq) =>  {
            return await api
            .put(`/userBook/updateListType`, bodyReq
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

    return {UpdateListType, errorUpdateListType,isErrorUpdateListType, UpdateListTypeDataIsLoading,updateListTypeMutate}
}
