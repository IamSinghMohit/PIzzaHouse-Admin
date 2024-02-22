import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
    GetProductPriceSectionSchema,
    TGetProductPriceSectionSchema,
} from "../schema";
import { ValidateBackendResponse } from "@/utils";

async function getProductPriceSections(
    id: string
): Promise<TGetProductPriceSectionSchema | undefined> {
    return await api
        .get(
            `/product/sections/${id}`
        )
        .then((res) => ValidateBackendResponse(res.data,GetProductPriceSectionSchema));
}
export function useProductPriceSection(id: string) {
    return useQuery({
        queryKey: ["product", "sections", id],
        queryFn: () => getProductPriceSections(id),
        enabled: !!id,
    });
}
