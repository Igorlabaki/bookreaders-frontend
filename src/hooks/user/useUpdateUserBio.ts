import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRecoverUserData } from "../auth/recoveryUserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpadateUserBio(){
    const { "auth.token": token } = parseCookies();
    const queryClient = useQueryClient();
    const {authUser} = useRecoverUserData()

    const {
        data: userBio,
        isError: errorUserBio,
        isLoading: userBioIsLoading,
        mutate: userBioMutate
        } = useMutation({
        mutationFn: async ({bio,username}: {bio:string,username:string}) => {
            return api.put(`/user/updateBio`, {
                bio: bio,
                username,
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

    return { userBio, errorUserBio,  userBioIsLoading,  userBioMutate}
}
