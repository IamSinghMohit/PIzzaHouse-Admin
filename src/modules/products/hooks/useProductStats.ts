import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { GetProductStatsSchema, TGetProductStatsSchema } from "../schema";
import { ValidateBackendResponse } from "@/utils";

async function getProductStats(): Promise<TGetProductStatsSchema | undefined> {
    return await axios("/product/stats").then((res) =>
        ValidateBackendResponse(res.data, GetProductStatsSchema)
    );
}
export function useProductStats() {
    return useQuery({
        queryKey: ["product", "stats"],
        queryFn: getProductStats,
    });
}
