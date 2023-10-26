import axios from "@/lib/axios";
import { useQuery} from "@tanstack/react-query";
import { AttributeSchemaType } from "../schema";


export default function useCategoryAttributes(id: string | null | undefined) {
    return useQuery({
        queryKey: ["category", "attribute", id],
        queryFn: async ():Promise<AttributeSchemaType> =>
            await axios.get(`/category-attr/${id}`).then((res) => res.data),
        enabled: !!id,
    });
}
