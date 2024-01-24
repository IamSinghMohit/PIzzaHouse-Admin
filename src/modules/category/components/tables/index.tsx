import { useCallback, useEffect, useRef, useState } from "react";
import DeleteCategoryAlert from "../modals/DeleteCategoryAlert";
import CategoryTableRender from "./CategoryTableRender";
import { TModalRef } from "@/types/Modal";
import AppPagination from "@/components/AppPagination";
import { useCategory } from "../../hooks";
import { useAppSelector } from "@/hooks/state";
import ViewCategoryModal from "../modals/ViewCategoryModal";
interface Props {}

function CategoryTable({}: Props) {
    const DeleteModalRef = useRef<TModalRef | null>(null);
    const ViewCategoryModalRef = useRef<TModalRef | null>(null);
    const [limit, setLimit] = useState("10");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const name = useAppSelector((state) => state.category.category_search_name);

    const handleDeleteClick = useCallback(() => {
        DeleteModalRef.current?.onOpen();
    }, []);

    const handleViewClick = useCallback(() => {
        ViewCategoryModalRef.current?.onOpen();
    }, []);

    const { data, isLoading, isError } = useCategory({
        limit: parseInt(limit),
        page: page,
        name,
    });

    useEffect(() => {
        setPages(data?.pages || 1);
    }, [data]);

    return (
        <>
            <DeleteCategoryAlert ref={DeleteModalRef} />
            <ViewCategoryModal ref={ViewCategoryModalRef} />
            <CategoryTableRender
                data={data?.categories || []}
                onDeleteClick={handleDeleteClick}
                onViewClick={handleViewClick}
                isLoading={isLoading}
                isError={isError}
            />
            <AppPagination
                totalPages={pages}
                page={page}
                setPage={setPage}
                setSelected={setLimit}
                selected={limit}
            />
        </>
    );
}

export default CategoryTable;
