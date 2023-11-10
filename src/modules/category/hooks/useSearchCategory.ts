import axios from "@/lib/axios";
import {
    useInfiniteQuery,
} from "@tanstack/react-query";
import { getCurrentWindow } from "@/utils";
import { CategorySchemaType} from "../schema";

async function searchCategory(
    text: string,
    limit: number,
    cursor?: string
): Promise<CategorySchemaType[]> {
    return await axios
        .get(`/category/search?name=${text}&limit=${limit}&cursor=${cursor}`)
        .then((res) => res.data.data);
}

export function useSearchCateogry(text: string) {
    const screen = getCurrentWindow();
    let limit = 3;
    if (screen == "mobile") {
        limit = 10;
    } else {
        limit = 20;
    }
    return useInfiniteQuery({
        queryKey: ["category", "search", text],
        queryFn: async ({ pageParam }) =>
            await searchCategory(text, limit, pageParam),
        initialPageParam: '',
        getNextPageParam: (lastePage) =>
            lastePage.length >= limit ? lastePage[lastePage.length - 1].id : undefined,
        enabled: !!text,
    });
}
