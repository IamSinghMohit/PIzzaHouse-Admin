import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
    GetProductPriceSectionSchema,
    TGetProductPriceSectionSchema,
} from "../schema/Get";
import { errorToast } from "@/lib/toast";
import { BackendSuccess } from "@/types/api";

async function getProductPriceSections(
    id: string
): Promise<TGetProductPriceSectionSchema | undefined> {
    const result = await axios
        .get<BackendSuccess<TGetProductPriceSectionSchema>>(
            `/product/sections/${id}`
        )
        .then((res) => res.data);
    try {
        return GetProductPriceSectionSchema.parse(result.data);
    } catch (error) {
        console.log(error)
        errorToast("recieved bad data from server");
        return undefined
    }
}
export function useProductPriceSection(id: string) {
    return useQuery({
        queryKey: ["product", "sections", id],
        queryFn: () => getProductPriceSections(id),
        enabled: !!id,
    });
}
