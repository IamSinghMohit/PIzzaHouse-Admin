import DeleteAlert from "@/components/DeleteAlert";
import { useAppSelector } from "@/hooks/state";
import AlertModelContent from "@/modules/shared/AlertModelContent";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { TModalRef } from "@/types/Modal";
import {forwardRef,Ref} from "react"

interface Props {}

function DeleteProductModal({}: Props,ref:Ref<TModalRef>) {
    const product = useAppSelector(
        (state) => state.product.product_management
    );
    const { mutate } = useDeleteProduct();
    console.log(product.product_id)
    const handleDeleteProduct = () => {
        mutate(product.product_id || "");
    };
    return (
        <DeleteAlert
            content={
                <AlertModelContent
                    main={product.product_name || "!"}
                    suffix="product"
                />
            }
            onYesPress={handleDeleteProduct}
            ref={ref}
        />
    );
}

export default forwardRef(DeleteProductModal)
