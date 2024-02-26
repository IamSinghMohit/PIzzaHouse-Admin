import { useQuery } from "@tanstack/react-query";
import { GetCategorySectionsSchema, TGetCategorySections } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function getSections(id: string): Promise<TGetCategorySections> {
    return await makeRequest(
        {
            url: `/category/admin/sections/${id}`,
            method: "GET",
        },
        GetCategorySectionsSchema
    );
}
export function useCategoryPriceSections(id: string) {
    return useQuery<TGetCategorySections,TBackendErrorReponse>({
        queryKey: ["category", "sections", id],
        queryFn: () => getSections(id),
        enabled: !!id,
    });
}
