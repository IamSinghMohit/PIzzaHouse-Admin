import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
    GetProductDetailsSchema,
    GetProductDetailsSchemaType,
} from "../schema/Get";
import { errorToast } from "@/lib/toast";

async function getProductAttributes(
    id: string
): Promise<GetProductDetailsSchemaType | undefined> {
    const result = await axios
        .get(`/product/attributes/${id}`)
        .then((res) => res.data);
    try {
        return GetProductDetailsSchema.parse(result);
    } catch (error) {
        errorToast("recieved bad data");
    }
}
export function useProductDetails(id: string) {
    return useQuery({
        queryKey: ["product", "details", id],
        queryFn: () => getProductAttributes(id),
        enabled: !!id,
    });
}
