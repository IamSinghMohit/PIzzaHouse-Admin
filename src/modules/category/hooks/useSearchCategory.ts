import axios from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TCategorySchema } from "../schema";

async function searchCategory(
    text: string,
    limit: number,
    cursor?: string
): Promise<TCategorySchema[]> {
    return await axios
        .get(`/category/search?name=${text}&limit=${limit}&cursor=${cursor}`)
        .then((res) => res.data.data);
}

export function useSearchCateogry(text: string, argLimit?: number) {
    const limit = argLimit || 10;
    return useInfiniteQuery({
        queryKey: ["category", "search", text],
        queryFn: async ({ pageParam }) =>
            await searchCategory(text, limit, pageParam),
        initialPageParam: "",
        getNextPageParam: (lastePage) =>
            lastePage.length >= limit
                ? lastePage[lastePage.length - 1].id
                : undefined,
        enabled: !!text,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });
}
