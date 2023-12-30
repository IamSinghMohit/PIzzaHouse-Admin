import { useQuery } from "@tanstack/react-query";
import { GetTopingsSchema, TGetTopingsSchema } from "../schema";
import axios from "@/lib/axios";
import { errorToast } from "@/lib/toast";
import { TitemStatus } from "@/modules/types/inex";

type getTopingsType = {
    name: string;
    featured?: boolean;
    status?: TitemStatus;
    min: number;
    max: number;
    category?: string;
    limit: string;
    page: number;
};

async function getTopings(opts: getTopingsType): Promise<TGetTopingsSchema> {
    let url = `/toping/admin/all?name=${opts.name}&min=${opts.min}&max=${opts.max}&page${opts.page}&limit${opts.limit}`;

    if (opts.status && opts.status !== "All") {
        url += `&status=${opts.status}`;
    }

    if (opts.category) {
        url += `&category=${opts.category}`;
    }
    const result = await axios.get(url).then((res) => res.data);
    try {
        return GetTopingsSchema.parse(result.data);
    } catch (error) {
        errorToast("received bad data from server");
        return { topings: [], pages: 1 };
    }
}


export function useTopings(opts: getTopingsType) {
    return useQuery({
        queryKey: [
            "toping",
            `name=${opts.name}`,
            `min=${opts.min}&max=${opts.max}`,
            `status=${opts.status}`,
            `category=${opts.category}`,
            `limit=${opts.limit}`,
            `page=${opts.page}`,
        ],
        queryFn: async () => getTopings(opts),
    });
}
