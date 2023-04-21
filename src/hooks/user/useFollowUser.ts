import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRecoverUserData } from "../auth/recoveryUserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFollowParams } from "@/types";

export function useFollowUser(){
    const queryClient = useQueryClient();
    const { "auth.token": token } = parseCookies();

    const {
        isLoading: userFollowIsLoading,
        mutate: userFollowMutate
        } = useMutation({
        mutationFn: async ({followerId,followingId}:IFollowParams) => {
            return api.post(`/user/follow`, {
                followerId:followerId,
                followingId: followingId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                return resp.data
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["recoveryAccountData"])
            queryClient.invalidateQueries(["postList"])
        }
    })

    return { userFollowIsLoading, userFollowMutate}
}
