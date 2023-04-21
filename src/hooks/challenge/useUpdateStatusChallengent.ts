import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import queryClient from "@/service/query";
import { useMutation } from "@tanstack/react-query";
import { IChallenge, IUpdatGoalChallengeParams, IUpdatStatusChallengeParams } from "@/types";


export  function useUpdateStatusChallengent(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: updateStatusChallengent,
        isError: erroNewupdateStatusChallengent,
        isLoading: updateStatusChallengentIsLoading,
        mutate: updateStatusChallengeMutate
        } = useMutation({
            mutationFn: (bodyReq: IUpdatStatusChallengeParams) => {
                return   api
                .put("/challenge/updateStatus", bodyReq, {
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

    return {updateStatusChallengent, erroNewupdateStatusChallengent, updateStatusChallengentIsLoading, updateStatusChallengeMutate}
}
