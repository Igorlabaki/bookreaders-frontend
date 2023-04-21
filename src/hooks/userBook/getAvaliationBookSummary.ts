import { IAvaliationBookSummaryResponse, IUser, IUserBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAvaliationBookSummary(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: avaliationBookSummary,
        error: errorAvaliationBookSummary,
        isError: isErrorAvaliationBookSummary,
        isLoading: avaliationBookSummaryIsLoading,
        mutate: avaliationBookSummaryMutate
    } =  useMutation({
            mutationFn: async (googleId: string) =>  {
            return await api
            .get(`/userBook/avaliationBookSummary/${googleId}`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            })
            .then((resp: { data: IAvaliationBookSummaryResponse}) => {
                return resp.data;
            })
        },
    })

    return {avaliationBookSummary, errorAvaliationBookSummary,isErrorAvaliationBookSummary,
        avaliationBookSummaryIsLoading,avaliationBookSummaryMutate}
}
