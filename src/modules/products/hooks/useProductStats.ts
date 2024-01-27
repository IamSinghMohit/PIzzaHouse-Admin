import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { GetProductStatsSchema, TGetProductStatsSchema } from "../schema/Get";
import { errorToast } from "@/lib/toast";

async function getProductStats(): Promise<TGetProductStatsSchema | undefined> {
    try {
        const result = await axios("/product/stats").then((res) => res.data);
        return GetProductStatsSchema.parse(result.data);
    } catch (error) {
        errorToast("recieved bad data from server");
        return undefined;
    }
}
export function useProductStats() {
    return useQuery({
        queryKey: ["product", "stats"],
        queryFn: getProductStats,
    });
}
