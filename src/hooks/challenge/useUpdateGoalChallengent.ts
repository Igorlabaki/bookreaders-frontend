import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import queryClient from "@/service/query";
import { useMutation } from "@tanstack/react-query";
import { IChallenge, IUpdatGoalChallengeParams } from "@/types";


export  function useUpdateGoalChallengent(){
    const { "auth.token": token } = parseCookies();
    
    const {
        data: updateGoalChallenge,
        isError: erroNewupdateGoalChallenge,
        isLoading: newupdateGoalChallengeIsLoading,
        mutate: updateGoalChallengeMutate
        } = useMutation({
            mutationFn: (bodyReq: IUpdatGoalChallengeParams) => {
                return   api
                .put("/challenge/updateGoal", bodyReq, {
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

    return {updateGoalChallenge, erroNewupdateGoalChallenge, newupdateGoalChallengeIsLoading, updateGoalChallengeMutate}
}
