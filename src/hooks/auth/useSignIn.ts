import { setCookie } from "nookies";
import { api } from "../../service/axios";
import queryClient from "../../service/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IToken } from "@/types";
import { useRouter } from "next/navigation";

export interface ISignInRequestBody {
    email: string;
    password: string ;
}

export function useSignIn(){
    const { push } = useRouter();
    const {
        data: authToken,
        error: errorSignInAuthToken,
        isError: isErrorSignInAuthToken,
        isLoading: authUserTokenIsLoading,
        mutate: signIn
    } =  useMutation({
        mutationFn:  ({ email, password}: ISignInRequestBody) => {
            return api.post("/auth/authenticate", {
                email,
                password,
            }).then((resp : {data : IToken}) => resp.data);
        },
        onSuccess: (result) => {
            console.log("porra")
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

    return {authToken, errorSignInAuthToken,isErrorSignInAuthToken, authUserTokenIsLoading,signIn}
}
