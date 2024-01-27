import DeleteAlert from "@/modules/commponents/DeleteAlert";
import { useAppSelector } from "@/hooks/state";
import AlertModelContent from "@/modules/commponents/AlertModelContent";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { TModalRef } from "@/types/Modal";
import { forwardRef, Ref } from "react";

function DeleteProductModal({}, ref: Ref<TModalRef>) {
    const id = useAppSelector(
        (state) => state.product.product_management.product_id,
    );
    const name = useAppSelector(
        (state) => state.product.product_management.product_name,
    );
    const { mutate } = useDeleteProduct();
    const handleDeleteProduct = () => {
        mutate(id || "");
    };

    return (
        <DeleteAlert
            content={<AlertModelContent main={name || "!"} suffix="product" />}
            onYesPress={handleDeleteProduct}
            ref={ref}
        />
    );
}

export default forwardRef(DeleteProductModal);
