import { useCallback, useEffect, useState, memo } from "react";
import AppTable from "@/components/Table";
import { CategoryColumns } from "@/data/cateogry-table";
import { CategorySchemaType } from "../../schema";
import ViewCategory from "../ViewCategory";
import DeleteAlart from "@/components/DeleteAlert";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setCurrentSelectedCategory } from "@/store/features/categorySlice";
import { useDeleteCategory } from "../../hooks";
import AlertModelContent from "@/modules/shared/AlertModelContent";

interface Props {
    data: CategorySchemaType[];
    isLoading: boolean;
    isError: boolean;
    cbIntersectionObr?: () => void;
    observeLastBy?: number;
    bottomContent?: React.ReactNode;
    onDelete: (cat: CategorySchemaType) => void;
}

function CategoryTable({
    data,
    isLoading,
    isError,
    cbIntersectionObr,
    observeLastBy,
    onDelete,
    bottomContent,
}: Props) {
    const { mutate, isSuccess } = useDeleteCategory();
    const { current_selected_category: category } = useAppSelector(
        (state) => state.category
    );

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleSetCategory(cat: CategorySchemaType) {
        dispatch(setCurrentSelectedCategory(cat));
    }

    const handleDelete = useCallback(() => {
        if (!category) return;
        const { id } = category;
        mutate(id);
        setDeleteModalOpen(false);
    }, [category]);

    const handleOnDeleteClick = useCallback((cat: CategorySchemaType) => {
        handleSetCategory(cat);
        setDeleteModalOpen(true);
    }, []);
    const handleOnEditClick = useCallback((cat: CategorySchemaType) => {
        handleSetCategory(cat);
        navigate(`update`);
    }, []);
    const handleOnViewClick = useCallback((cat: CategorySchemaType) => {
        handleSetCategory(cat);
        setViewModalOpen(true);
    }, []);

    useEffect(() => {
        if (isSuccess && category) {
            onDelete(category);
        }
    }, [isSuccess]);

    useEffect(() => {

    },[])
    return (
        <>
            <AppTable
                columns={CategoryColumns}
                emptyContent={
                    isError
                        ? "Some server occured ❌"
                        : "No Category found create 🔥 one!"
                }
                isLoading={isLoading}
                classsName="category-table-screen max-h-[330px] sm:max-h-[450px] md:max-h-[460px] lg:max-h-[520px]"
                cbIntersectionObr={cbIntersectionObr}
                observeLastBy={observeLastBy}
                bottomContent={bottomContent}
                data={data}
                onDeleteClick={handleOnDeleteClick}
                onEditClick={handleOnEditClick}
                onViewClick={handleOnViewClick}
            />
            <DeleteAlart
                onClose={() => setDeleteModalOpen(false)}
                open={deleteModalOpen}
                content={<AlertModelContent main={category?.name || ''} suffix="category"/>}
                onNoPress={() => setDeleteModalOpen(false)}
                onYesPress={handleDelete}
            />
            <ViewCategory
                open={viewModalOpen}
                setModalOpen={setViewModalOpen}
            />
        </>
    );
}

export default memo(CategoryTable);
