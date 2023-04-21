import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import queryClient from "@/service/query";
import { useMutation } from "@tanstack/react-query";
import useGetBookPostBookList from "../post/useGetBookPostList";
import { IChallenge, ICreateChallengeParams } from "@/types";

export  function useCreateChallenge(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: challenge,
        isError: erroNewChallenge,
        isLoading: newChallengeIsLoading,
        mutate: createChallengeMutate
        } = useMutation({
            mutationFn: (bodyReq: ICreateChallengeParams) => {
                return   api
                .post("/challenge/create", bodyReq, {
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

    return {challenge, erroNewChallenge, newChallengeIsLoading, createChallengeMutate}
}
