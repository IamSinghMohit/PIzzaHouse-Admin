import DeleteAlert from "@/modules/commponents/DeleteAlert";
import { useAppSelector } from "@/hooks/state";
import AlertModelContent from "@/modules/commponents/AlertModelContent";
import { TModalRef } from "@/types/Modal";
import { forwardRef, Ref } from "react";
import { useDeleteToping } from "../../hooks/useDeleteTopoing";

function DeleteTopinModal({}, ref: Ref<TModalRef>) {
    const {mutate} = useDeleteToping()
    const id = useAppSelector(
        (state) => state.toping.toping_management.id,
    );
    const name = useAppSelector(
        (state) => state.toping.toping_management.name,
    );
    // const { mutate } = useDeleteProduct();
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

export default forwardRef( DeleteTopinModal);
