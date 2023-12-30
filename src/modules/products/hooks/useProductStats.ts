import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { GetProductStatsSchema } from "../schema/Get";
import { errorToast } from "@/lib/toast";

async function getProductStats() {
    try {
        const result = await axios("/product/stats").then((res) => res.data)
        return GetProductStatsSchema.parse(result.data)
    } catch (error) {
        errorToast('recieved bad data from server')
        return {max_price:1500}
    }
}
export function useProductStats() {
    return useQuery({
        queryKey: ["product", "stats"],
        queryFn: getProductStats,
    });
}
