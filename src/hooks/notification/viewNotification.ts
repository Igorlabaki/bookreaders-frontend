import { parseCookies } from "nookies";
import { INotifications } from "@/types";
import { api } from "../../service/axios";
import queryClient from "@/service/query";
import { useMutation } from "@tanstack/react-query";

export  function useViewNotification(){
    const { "auth.token": token } = parseCookies();
   
    const {
        data: view,
        isError: erroViewNotification,
        isLoading: viewNotificationIsLoading,
        mutate: viewNotificationMutate
        } = useMutation({
            mutationFn: (notificationId: string) => {
                console.log(notificationId)
                return   api.
                    put(`/notification/view`,{notificationId}, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp : { data: INotifications}) => resp.data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["notificationById"])
                queryClient.invalidateQueries(["recoveryAccountData"])
            }
        }
    )

    return {view, erroViewNotification, viewNotificationIsLoading, viewNotificationMutate}
}
