import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRecoverUserData } from "../auth/recoveryUserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpadateUserAvatar(){
    const { "auth.token": token } = parseCookies();
    const queryClient = useQueryClient();
    const {authUser} = useRecoverUserData()
    const {
        data: userAvatar,
        isError: errorUserAvatar,
        isLoading: userAvatarIsLoading,
        mutate: userAvatarMutate
        } = useMutation({
        mutationFn: async (avatarUrl: string) => {
            return api.put(`/user/updateAvatar`, {
                avatarUrl: avatarUrl,
                userId: authUser?.id
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
        }
    })

    return { userAvatar, errorUserAvatar,  userAvatarIsLoading,  userAvatarMutate}
}
