import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AttributeSchema, AttributeSchemaType } from "../schema";

async function getCategoryAttributes(id: string): Promise<AttributeSchemaType> {
    const api = await axios.get(`/category/attributes/${id}`).then((res) => res.data);
    return await AttributeSchema.parseAsync(api);
    
}
export function useCategoryAttributes(id: string) {
    return useQuery({
        queryKey: ["category", "attribute", id],
        queryFn: () => getCategoryAttributes(id),
        enabled: !!id,
    });
}
