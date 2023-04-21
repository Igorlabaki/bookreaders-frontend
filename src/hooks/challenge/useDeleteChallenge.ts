import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import queryClient from "@/service/query";
import { useMutation } from "@tanstack/react-query";
import useGetBookPostBookList from "../post/useGetBookPostList";
import { IChallenge, ICreateChallengeParams } from "@/types";

export  function useDeleteChallenge(){
    const { "auth.token": token } = parseCookies();
    
    const {
        isError: erroDeleteChallenge,
        isLoading: deleteChallengeIsLoading,
        mutate: deleteChallengeMutate
        } = useMutation({
            mutationFn: (chalengeId:string) => {
                return   api
                .delete(`/challenge/delete/${chalengeId}` , {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp : { data: IChallenge}) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["recoveryAccountData"])
            }
        }
    )

    return {erroDeleteChallenge, deleteChallengeIsLoading, deleteChallengeMutate}
}
