import CategoryTable from "./CategoryTable";
import { useState, useEffect, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setTotalPages } from "@/store/features/categorySlice";
import AppPagination from "@/components/AppPagination";
import { useQueryClient } from "@tanstack/react-query";
import { useCategory } from "../../hooks";

interface Props {}

function PaginatedTable({}: Props) {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState("10");
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const { data, isError, isLoading } = useCategory(page, parseInt(selected));
    const { total_pages } = useAppSelector((state) => state.category);

    const handleOnDelete = useCallback( () => {
         queryClient.refetchQueries({
            queryKey: [
                "category",
                `page=${page}`,
                `limit=${parseInt(selected)}`,
            ]
        });
    },[])
    

    useEffect(() => {
        if (data?.pages) {
            dispatch(setTotalPages(data?.pages));
        }
    }, [data?.data]);

    console.log('rendered paginated Table')
    return (
        <div className="flex flex-col">
            <CategoryTable
                onDelete={handleOnDelete}
                data={data?.data || []}
                isLoading={isLoading}
                isError={isError}
            />
            <AppPagination
                totalPages={total_pages}
                setSelected={setSelected}
                page={page}
                setPage={setPage}
                selected={selected}
            />
        </div>
    );
}

export default memo(PaginatedTable);
