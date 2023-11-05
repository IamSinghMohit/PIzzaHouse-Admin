import axios from "@/lib/axios"
import {useQuery} from "@tanstack/react-query"

export function useSearchCateogry(text:string){
    return useQuery({
        queryKey:['category','search',''],
        queryFn:async() => await axios.get(`/category/search?name=${text}`).then((res) => res.data),
        enabled:!!text
    })
}