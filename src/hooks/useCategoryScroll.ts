import axios from "@/lib/axios";
import { TCategorySchema } from "@/modules/category/schema";
import { useInfiniteQuery } from "@tanstack/react-query";

async function InfiniteCategoryScroll(
    cursor?: string
): Promise<TCategorySchema[]> {
    return await axios
        .get(`/category/search?name&limit=10&cursor=${cursor}`)
        .then((res) => res.data.data);
}

export function useCategoryScroll() {
    const { isLoading, fetchNextPage, data, hasNextPage } = useInfiniteQuery({
        queryKey: ["category", "scroll"],
        queryFn: async ({ pageParam }) =>
            await InfiniteCategoryScroll(pageParam),
        initialPageParam: "",
        getNextPageParam: (lastePage) =>
            lastePage.length >= 10
                ? lastePage[lastePage.length - 1].id
                : undefined,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });

    return {
        items: data?.pages.flat() || [],
        hasMore: hasNextPage,
        isLoading,
        onLoadMore: fetchNextPage,
    };
}
