import { parseCookies } from "nookies";
import queryClient from "@/service/query";
import { api } from "../../service/axios";
import {  IGoogleSearchParams } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useSearchGoogleBooks(){
    const {
        data: googleSearch,
        isError: erroGoogleSearch,
        isLoading: googleSearchIsLoading,
        mutate: googleSearchMutate
        } = useMutation({
            mutationFn: (bodyReq: IGoogleSearchParams) => {
                return   api
                .get( `https://www.googleapis.com/books/v1/volumes?q=intitle:${bodyReq.search}&key=AIzaSyCQPpX0QFUTs45EhUe1Ou5FNjEAjjvtYRQ&maxResults=${
                    bodyReq.maxLenght ? bodyReq.maxLenght : "40"
                }`)
                .then((resp) => resp.data)
            },
            onSuccess: () => {
            }
        }
    )

    return {googleSearch, erroGoogleSearch, googleSearchIsLoading, googleSearchMutate}
}

