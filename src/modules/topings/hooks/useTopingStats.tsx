import { useQuery } from "@tanstack/react-query";
import { GetTopingStatsShchema, TGetTopingStatsShchema } from "../schema";
import { makeRequest } from "@/utils";

async function getStats(): Promise<TGetTopingStatsShchema | undefined> {
    return await makeRequest(
        {
            url: "toping/admin/stats",
            method: "GET",
        },
        GetTopingStatsShchema
    );
}
export function useTopingStats() {
    return useQuery({
        queryKey: ["toping", "stats"],
        queryFn: getStats,
    });
}
