import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCategorySectionsSchema, TGetCategorySections } from "../schema";

async function getSections(id: string): Promise<TGetCategorySections> {
    const result = await axios
        .get(`/category/sections/${id}`)
        .then((res) => res.data);
        return GetCategorySectionsSchema.parse(result);
}
export function useCategoryPriceSections(id: string) {
    return useQuery({
        queryKey: ["category", "sections", id],
        queryFn: () => getSections(id),
        enabled: !!id,
    });
}
