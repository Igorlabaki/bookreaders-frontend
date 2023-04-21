import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRecoverUserData } from "../auth/recoveryUserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFollowParams } from "@/types";

export function useUnfollowUser(){
    const queryClient = useQueryClient();
    const { "auth.token": token } = parseCookies();

    const {
        isLoading: userUnfollowIsLoading,
        mutate: useUnfollowMutate
        } = useMutation({
        mutationFn: async ({followerId,followingId}:IFollowParams) => {
            return api.post(`/user/unfollow`, {
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

    return { userUnfollowIsLoading, useUnfollowMutate}
}
