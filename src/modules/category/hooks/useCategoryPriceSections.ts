import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCategorySectionsSchema, TGetCategorySections } from "../schema";
import { ValidateBackendResponse } from "@/utils";

async function getSections(
    id: string
): Promise<TGetCategorySections["data"] | undefined> {
    let result = await api
        .get(`/category/admin/sections/${id}`)
        .then((res) =>
            ValidateBackendResponse(res.data, GetCategorySectionsSchema)
        );
    if (result) {
        return result.data;
    }
    return result;
}
export function useCategoryPriceSections(id: string) {
    return useQuery({
        queryKey: ["category", "sections", id],
        queryFn: () => getSections(id),
        enabled: !!id,
    });
}
