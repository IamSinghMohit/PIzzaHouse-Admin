import { useQuery } from "@tanstack/react-query";
import { GetProductStatsSchema, TGetProductStatsSchema } from "../schema";
import { makeRequest } from "@/utils";

async function getProductStats(): Promise<TGetProductStatsSchema> {
    return await makeRequest(
        {
            url: "/product/stats",
            method: "GET",
        },
        GetProductStatsSchema
    );
}
export function useProductStats() {
    return useQuery({
        queryKey: ["product", "stats"],
        queryFn: getProductStats,
    });
}
