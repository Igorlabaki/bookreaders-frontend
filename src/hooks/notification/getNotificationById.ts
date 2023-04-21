import { INotifications, IUser } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function useGetNotificationById(id: string | string[] | undefined){
    const { "auth.token": token } = parseCookies();

    const {
        data: notificationById,
        error: errorNotificationById,
        isError: isErrorNotificationById,
        isLoading: notificationByIdDataIsLoading,
    } =  useQuery({
            queryKey: ["notificationById",token],
            queryFn: async () =>  {
            return await api
            .get(`/notification/getById/${id}`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            })
            .then((resp: { data: INotifications}) => {
                return resp.data;
            })
        },
    })

    return {notificationById, errorNotificationById,isErrorNotificationById, notificationByIdDataIsLoading}
}
