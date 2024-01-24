import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCategorySectionsSchema, TGetCategorySections } from "../schema";
import { errorToast } from "@/lib/toast";

async function getSections(id: string): Promise<TGetCategorySections["data"]> {
    const result = await axios
        .get(`/category/admin/sections/${id}`)
        .then((res) => res.data);
    try {
        return GetCategorySectionsSchema.parse(result).data;
    } catch (error) {
        console.log(error);
        errorToast("received bad data from server");
        return [];
    }
}
export function useCategoryPriceSections(id: string) {
    return useQuery({
        queryKey: ["category", "sections", id],
        queryFn: () => getSections(id),
        enabled: !!id,
    });
}
