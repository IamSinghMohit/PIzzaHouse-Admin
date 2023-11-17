import axios from "@/lib/axios";
import { errorToast } from "@/lib/toast";
import { CategorySchemaType } from "@/modules/category/schema";
import { useEffect, useState } from "react";

export function useCategoryScroll() {
    const [items, setItems] = useState<CategorySchemaType[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    let loaded = false;

    const loadPokemon = async () => {
        try {
            setIsLoading(true);
            let res = await axios.get<{ data: CategorySchemaType[] }>(
                `/category/search?name=&limit=10&cursor=${
                    items.length > 0 ? items[items.length - 1].id : ""
                }`
            );

            if (!res.data) {
                console.log(res.data);
                throw new Error("Network response was not ok");
            }
            if (res.data.data.length <= 0) {
                setHasMore(false);
            }
            setItems((prevItems) => [...prevItems, ...res.data.data]);
        } catch (error) {
            errorToast("Error while fetching category");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!loaded) {
            loadPokemon();
            loaded = true;
        }
    }, []);

    const onLoadMore = () => {
        loadPokemon();
    };

    return {
        items,
        hasMore,
        isLoading,
        onLoadMore,
    };
}
