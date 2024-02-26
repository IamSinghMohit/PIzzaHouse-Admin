import { useQuery } from "@tanstack/react-query";
import {
    GetProductPriceSectionSchema,
    TGetProductPriceSectionSchema,
} from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function getProductPriceSections(
    id: string
): Promise<TGetProductPriceSectionSchema> {
    return await makeRequest(
        {
            url: `/product/sections/${id}`,
            method: "GET",
        },
        GetProductPriceSectionSchema
    );
}
export function useProductPriceSection(id: string) {
    return useQuery<TGetProductPriceSectionSchema, TBackendErrorReponse>({
        queryKey: ["product", "sections", id],
        queryFn: () => getProductPriceSections(id),
        enabled: !!id,
    });
}
