import ModalButton from "@/modules/shared/ModalButton";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormDataSend } from "@/utils";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppSelector } from "@/hooks/state";
import { errorToast } from "@/lib/toast";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}


function CreateProductButton({ setIsLoading, processedImage }: Props) {
    const { mutate, isPending } = useCreateProduct();
    const {product_price_sec,product_management} = useAppSelector((state) => state.product)
    function handleCreate() {
        if (!processedImage.file) {
            return errorToast("image is required");
        } else if (!product_management.product_name) {
            return errorToast("name is required");
        }
        FormDataSend(
            {
                // image: processedImage.file,
                // name: product_management.product_name,     //  left to modify here
                // json: JSON.stringify(product_price_sec),
            },
            mutate
        );
    }

    useEffect(() => {
        setIsLoading(isPending);
    }, [isPending]);

    return <ModalButton isLoading={isPending} onPress={handleCreate}>Create</ModalButton>
}

export default CreateProductButton;
