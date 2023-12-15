import DeleteAlert from "@/components/DeleteAlert";
import AlertModelContent from "@/modules/shared/AlertModelContent";

interface Props {}

function DeleteProductModal({}: Props) {
    return (
        <DeleteAlert
            content={
                <AlertModelContent
                    main={currentCategory?.name || "!"}
                    suffix="product"
                />
            }
        />
    );
}

export default DeleteProductModal;
