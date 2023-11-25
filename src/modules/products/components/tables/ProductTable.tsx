import { setCurrentProduct } from "@/store/features/productSlice";
import { GetProductsSchemaType } from "../../schema/Get";
import ViewProduct from "../ViewProduct";
import DumbProductTable from "./table";
import { useState, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { useNavigate } from "react-router-dom";
import DeleteAlart from "@/components/DeleteAlert";
import AlertModelContent from "@/modules/shared/AlertModelContent";

interface Props {
    data: GetProductsSchemaType["data"];
    isLoading: boolean;
    isError: boolean;
}

function ProductTable({ data, isLoading, isError }: Props) {
    const [viewModelOpen, setViewModalOpen] = useState(false);
    const [deleteModelOpen, setDeleteModelOpen] = useState(false);
    const { current_product } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleViewClick = useCallback((e: any) => {
        dispatch(setCurrentProduct(e));
        setViewModalOpen(true);
    }, []);

    const handleDeleteClick = useCallback((e: any) => {
        dispatch(setCurrentProduct(e));
        setDeleteModelOpen(true);
    }, []);

    const handleEditClick = useCallback((e: any) => {
        dispatch(setCurrentProduct(e));
        navigate("/update");
    }, []);

    return (
        <>
            <DumbProductTable
                data={data}
                classsName="product-table-screen max-h-[330px] sm:max-h-[450px] md:max-h-[460px] lg:max-h-[520px]"
                onViewClick={handleViewClick}
                onDeleteClick={handleDeleteClick}
                isLoading={isLoading}
                isError={isError}
                onEditClick={handleEditClick}
            />
            <ViewProduct open={viewModelOpen} setOpen={setViewModalOpen} />
            <DeleteAlart
                content={
                    <AlertModelContent main={current_product?.name || ""} suffix="product"/>
                }
                open={deleteModelOpen}
                onClose={() => setDeleteModelOpen(false)}
            />
        </>
    );
}

export default memo(ProductTable);
