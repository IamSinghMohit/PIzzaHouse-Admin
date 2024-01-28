import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetTopingStats, TGetTopingStats } from "../schema";
import { errorToast } from "@/lib/toast";

async function getStats(): Promise<TGetTopingStats["data"] | undefined> {
    return await axios
        .get("toping/admin/stats")
        .then((res) => res.data)
        .then((res) => {
            try {
                return GetTopingStats.parse(res).data;
            } catch (error) {
                errorToast("received bad data from server");
                return undefined;
            }
        });
}
export function useTopingStats() {
    return useQuery({
        queryKey: ["toping", "stats"],
        queryFn: getStats,
    });
}
