import ModalButton from "@/modules/commponents/ModalButton";
import { TProcessedImage } from "@/types/ImageUploader";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppSelector } from "@/hooks/state";
import { IconPencilPlus } from "@tabler/icons-react";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { FormDataSend } from "@/utils";

export type TUpdateProductButtonProps = {
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
    onSuccess?: () => void;
};

function UpdateProductButton({
    setIsLoading,
    processedImage,
    onSuccess,
}: TUpdateProductButtonProps) {
    const { mutate, isPending, data } = useUpdateProduct();
    const { updated_fields, product_management, default_prices } =
        useAppSelector((state) => state.product);

    function handleUpdateProduct() {
        const obj: any = {
            id: product_management.product_id,
            ...(updated_fields.product_name
                ? { name: product_management.product_name }
                : {}),
            ...(updated_fields.product_price
                ? { price: product_management.product_price }
                : {}),
            ...(updated_fields.product_description
                ? { description: product_management.product_description }
                : {}),
            ...(updated_fields.product_image
                ? { image: processedImage.file }
                : {}),
            ...(updated_fields.product_status
                ? { status: product_management.product_status }
                : {}),
            ...(updated_fields.product_featured
                ? { featured: product_management.product_featured }
                : {}),
        };
        if (updated_fields.product_default_attributes) {
            const array = [];
            for (let key in default_prices) {
                const item = default_prices[key];
                array.push({
                    id: item.id,
                    section: item.section,
                    name: item.name,
                });
            }
            obj.default_attributes_json = JSON.stringify(array);
        }
        if (processedImage.file) {
            obj.image = processedImage.file;
        }
        FormDataSend(obj, mutate);
    }

    useEffect(() => {
        if (setIsLoading) {
            setIsLoading(isPending);
        }
        if (data) {
            if (onSuccess) onSuccess();
        }
    }, [isPending]);

    return (
        <ModalButton
            onPress={handleUpdateProduct}
            isLoading={isPending}
            icon={<IconPencilPlus width={20} />}
        >
            Update
        </ModalButton>
    );
}

export default UpdateProductButton;
