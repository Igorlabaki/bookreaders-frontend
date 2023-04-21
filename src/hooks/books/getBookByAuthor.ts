import { IGoogleBook } from "../../types";
import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/service/query";

export function useGetBookByAuthor(){
    const { "auth.token": token } = parseCookies();
    const {
        data: bookByAutor,
        error: errorBookByAutor,
        isError: isErrorBookByAutor,
        isLoading: bookByAutorDataIsLoading,
        mutate: getBookByAuthorMutate
    } = useMutation({
        mutationFn: (autor: string | string[] | undefined) => {
            const url = `q=a+inauthor:${autor}`;
            return   api
            .get(`https://www.googleapis.com/books/v1/volumes?${url}&key=AIzaSyCQPpX0QFUTs45EhUe1Ou5FNjEAjjvtYRQ&maxResults=5`)
                .then((resp: { data: {
                    items: IGoogleBook[]
                }}) => {
                    return resp.data;
                })
        },
        onSuccess: () => {

        }
    })

    return {bookByAutor, errorBookByAutor,isErrorBookByAutor, bookByAutorDataIsLoading,getBookByAuthorMutate}
}

