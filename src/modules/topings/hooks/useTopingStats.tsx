import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetTopingStats, TGetTopingStats } from "../schema";
import { errorToast } from "@/lib/toast";

async function getStats(): Promise<TGetTopingStats["data"] | undefined> {
    const result = await axios.get("toping/admin/stats").then((res) => res.data);
    try {
        return GetTopingStats.parse(result).data;
    } catch (error) {
        errorToast("received bad data from server");
    }
}
export function useTopingStats() {
    return useQuery({
        queryKey: ["toping", "stats"],
        queryFn: getStats,
    });
}
