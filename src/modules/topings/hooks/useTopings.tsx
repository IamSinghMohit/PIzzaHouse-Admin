import { useQuery } from "@tanstack/react-query";
import { GetTopingsSchema, TGetTopingsSchema } from "../schema";
import { TitemStatus } from "@/modules/types/inex";
import {
    TBackendErrorReponse,
    makeRequest,
} from "@/utils";

type getTopingsType = {
    name: string;
    featured?: boolean;
    status?: TitemStatus;
    min: number;
    max: number;
    category?: string;
    limit: number;
    page: number;
};

async function getTopings(opts: getTopingsType): Promise<TGetTopingsSchema> {
    let url = `/toping/admin/all?name=${opts.name}&min=${opts.min}&max=${opts.max}&page=${opts.page}&limit=${opts.limit}`;

    if (opts.status && opts.status !== "All") {
        url += `&status=${opts.status}`;
    }

    if (opts.category) {
        url += `&category=${opts.category}`;
    }
    return makeRequest(
        {
            url: url,
            method: "GET",
        },
        GetTopingsSchema
    );
}

export function useTopings(opts: getTopingsType) {
    return useQuery<TGetTopingsSchema, TBackendErrorReponse>({
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
