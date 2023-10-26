import { useState } from "react";
import AppTable from "@/components/Table";
import { CategoryColumns } from "@/data/cateogry-table";
import { useCategory } from "../hooks/useCategory";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { CategorySchemaType } from "../schema";
import ViewCategory from "./ViewCategory";
import DeleteAlart from "@/components/DeleteAlert";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setCurrentSelectedCategory } from "@/store/features/categorySlice";

interface Props {}

function CategoryTable({}: Props) {
    const { data = [] } = useCategory();
    const { mutate } = useDeleteCategory();
    const category = useAppSelector((state) => state.category.currentSelectedCategory)
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [viewModalOpen,setViewModalOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    function handleSetCategory(cat:CategorySchemaType){
        dispatch(setCurrentSelectedCategory(cat))
    }

    function handleDelete() {
        if (!category) return;
        const { id } = category;
        const url = category.image.split("/");
        const image = url[url.length - 1].split(".")[0];
        mutate({ id, image });
    }
    return (
        <>
            <AppTable
                columns={CategoryColumns}
                classsName="screen"
                data={data}
                onDeleteClick={(cat) => {
                    handleSetCategory(cat)
                    setDeleteModalOpen(true);
                }}
                onEditClick={(cat) => {
                    handleSetCategory(cat)
                   navigate(`update`) 
                }}
                onViewClick={(cat) => {
                    handleSetCategory(cat)
                    setViewModalOpen((true))
                }}
            />
            <DeleteAlart
                onClose={() => setDeleteModalOpen(false)}
                open={deleteModalOpen}
                text={`Are you sure you want to delte ${category?.name} category`}
                onNoPress={() => setDeleteModalOpen(false)}
                onYesPress={handleDelete}
            />
            <ViewCategory open={viewModalOpen} setModalOpen={setViewModalOpen} />
        </>
    );
}

export default CategoryTable;
