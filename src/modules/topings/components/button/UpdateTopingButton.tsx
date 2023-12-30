import ModalButton from "@/modules/commponents/ModalButton";
import { TProcessedImage } from "@/types/ImageUploader";
import { Dispatch, SetStateAction, useEffect } from "react";
import {  useAppSelector } from "@/hooks/state";
import { IconPencilPlus } from "@tabler/icons-react";
import { FormDataSend } from "@/utils";
import { errorToast } from "@/lib/toast";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}

function UpdateTopingButton({ setIsLoading, processedImage }: Props) {
    // const { mutate, isPending } = useUpdateProduct();
    const {
        updated_fields,
        product_management,
        product_price_section_attribute,
        default_prices,
    } = useAppSelector((state) => state.product);

    function handleUpdateProduct() {
        const obj: any = {
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
        // FormDataSend(obj, mutate);
    }

    // useEffect(() => {
    //     setIsLoading(isPending);
    // }, [isPending]);

    return (
        <ModalButton
            onPress={handleUpdateProduct}
            isLoading={false}
            icon={<IconPencilPlus width={20} />}
        >
            Update
        </ModalButton>
    );
}

export default  UpdateTopingButton;
