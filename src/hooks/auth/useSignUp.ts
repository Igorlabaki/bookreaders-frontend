import { setCookie } from "nookies";
import { api } from "../../service/axios";
import queryClient from "../../service/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IToken } from "@/types";
import { useRouter } from "next/navigation";

export interface ISignInRequestBody {
    email: string ;
    username: string;
    password: string;
}

export function useSignUp(){
    const { push } = useRouter();
    const {
        data: authToken,
        error: errorSignUpAuthToken,
        isError: isErrorSignUpAuthToken,
        isLoading: authUserTokenIsLoading,
        mutate: signUp
    } =  useMutation({
        mutationFn: async ({ email,username, password}: ISignInRequestBody) => {
            return api.post( `/auth/create`, {
                email,
                username,
                password,
            }).then((resp : {data : IToken}) => resp.data);
        },
        onSuccess: (result) => {
            setCookie(undefined, "auth.token", result.token, {
                maxAge: 60 * 60 * 1, // 1 hour
            });
            queryClient.setQueryData(['session'], result)
            push("/home")
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return {authToken, errorSignUpAuthToken,isErrorSignUpAuthToken, authUserTokenIsLoading,signUp}
}
