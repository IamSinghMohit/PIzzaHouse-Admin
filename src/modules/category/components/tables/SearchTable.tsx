import { useSearchCateogry } from "../../hooks";
import { useEffect, memo, useCallback } from "react";
import CategoryTable from "./CategoryTable";
import { errorToast } from "@/lib/toast";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setLoading } from "@/store/features/searchSlice";
import { useQueryClient } from "@tanstack/react-query";
import { CategorySchemaType } from "../../schema";
import { filterArrayById } from "@/utils";

interface Props {
    text: string | null;
}
type OldDataType = {
    pages: CategorySchemaType[][];
    pageParam: string;
};

function SearchCategoryTable({ text }: Props) {
    const { data, isLoading, isError, fetchNextPage } = useSearchCateogry(
        text || ""
    );
    const { isLoading: searching } = useAppSelector(
        (state) => state.search.categories
    );
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isError) {
            errorToast("failed to fetch from server");
            dispatch(setLoading(false));
        }
        if (data) {
            dispatch(setLoading(false));
        }
    }, [isError, data]);

    const handleOnDelete = (cat: CategorySchemaType) => {
        queryClient.setQueryData(
            ["category", "search", text],
            (oldData: OldDataType) => {
                const newData = filterArrayById(oldData.pages, cat.id);
                return {
                    ...oldData,
                    pages: newData,
                };
            }
        );
    }

    const fetchNext = useCallback(() => {
        fetchNextPage();
    }, []);

    console.log("rendered search Table");
    return (
        <CategoryTable
            onDelete={handleOnDelete}
            data={data?.pages.flat() || []}
            isLoading={searching || isLoading}
            isError={isError}
            observeLastBy={4}
            cbIntersectionObr={fetchNext}
        />
    );
}

export default memo(SearchCategoryTable);
