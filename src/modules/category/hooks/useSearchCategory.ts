import { useInfiniteQuery } from "@tanstack/react-query";
import {
    GetSearchCategorySchema,
    TGetSearchCategorySchema,
} from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function searchCategory(
    text: string,
    limit: number,
    cursor?: string
): Promise<TGetSearchCategorySchema> {
    return makeRequest(
        {
            url: `/category/search?name=${text}&limit=${limit}&cursor=${cursor}`,
            method: "GET",
        },
        GetSearchCategorySchema
    );
}

export function useSearchCateogry(text: string, argLimit?: number) {
    const limit = argLimit || 10;
    return useInfiniteQuery<TGetSearchCategorySchema,TBackendErrorReponse>({
        queryKey: ["category", "search", text],
        queryFn: async ({ pageParam}) =>
            await searchCategory(text, limit, pageParam as string),
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
