import axios from "@/lib/axios"
import {useQuery} from "@tanstack/react-query"
import { CategorySchemaType } from "../schema"

export function useSearchCateogry(text:string){
    return useQuery({
        queryKey:['category','search',text],
        queryFn:async():Promise<CategorySchemaType[]> => await axios.get(`/category/search?name=${text}`).then((res) => res.data),
        enabled:!!text
    })
}