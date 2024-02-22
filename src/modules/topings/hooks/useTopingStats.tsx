import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetTopingStatsShchema, TGetTopingStatsShchema } from "../schema";
import { ValidateBackendResponse } from "@/utils";

async function getStats(): Promise<TGetTopingStatsShchema | undefined> {
    return await axios
        .get("toping/admin/stats")
        .then((res) =>
            ValidateBackendResponse(res.data, GetTopingStatsShchema)
        );
}
export function useTopingStats() {
    return useQuery({
        queryKey: ["toping", "stats"],
        queryFn: getStats,
    });
}
