import DeleteAlert from "@/components/DeleteAlert";
import { forwardRef, Ref } from "react";
import { useDeleteCategory } from "../../hooks";
import { TModalRef } from "@/types/Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import AlertModelContent from "@/modules/shared/AlertModelContent";
import { setCurrentSelectedCategory } from "@/store/features/categorySlice";

interface Props {}

function DeleteCategoryAlert({}: Props, ref: Ref<TModalRef>) {
    const { mutate } = useDeleteCategory();
    const currentCategory = useAppSelector(
        (state) => state.category.current_selected_category
    );
    const dispatch = useAppDispatch();

    function handleYesPress() {
        mutate(currentCategory?.id || "");
        dispatch(setCurrentSelectedCategory(null));
    }

    return (
        <DeleteAlert
            onYesPress={handleYesPress}
            onNoPress={() => {}}
            content={
                <AlertModelContent
                    main={currentCategory?.name || "!"}
                    suffix="category"
                />
            }
            ref={ref}
        />
    );
}

export default forwardRef(DeleteCategoryAlert);
