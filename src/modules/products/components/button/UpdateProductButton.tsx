import ModalButton from "@/modules/commponents/ModalButton";
import { TProcessedImage } from "@/types/ImageUploader";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { IconPencilPlus } from "@tabler/icons-react";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { FormDataSend, ShowProhibitedInfo } from "@/utils";
import { errorToast } from "@/lib/toast";
import { setProductPriceSectionAttribute } from "@/store/slices/product";

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
    const dispatch = useAppDispatch();
    const { mutate, isPending, data } = useUpdateProduct();
    const {
        updated_fields,
        product_management,
        default_prices,
        product_price_section_attribute,
    } = useAppSelector((state) => state.product);

    function handleUpdateProduct() {
        return ShowProhibitedInfo()
        const obj: any = {
            id: product_management.product_id,
            featured:product_management.product_featured,
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
        if (updated_fields.product_sections) {
            let error = false;
            //       validation kicks in
            const sections: any = [];
            for (let key in product_price_section_attribute) {
                const attribute = product_price_section_attribute[key];
                if (!attribute.value) {
                    if (!error) {
                        errorToast("Fill in all the fields");
                    }
                    error = true;
                    dispatch(
                        setProductPriceSectionAttribute({
                            type: "UPDATE",
                            data: {
                                [key]: {
                                    ...attribute,
                                    error: true,
                                },
                            },
                        }),
                    );
                }

                if (!error) {
                    // Check if a section with the given title already exists in sections
                    const existingSection = sections.find(
                        (s: any) => s.name === attribute.section,
                    );

                    if (existingSection) {
                        existingSection.attributes.push({
                            value: parseInt(attribute.value),
                            name: attribute.name,
                            id: key,
                        });
                    } else {
                        // If the section doesn't exist, create a new section
                        sections.push({
                            name: attribute.section,
                            attributes: [
                                {
                                    value: parseInt(attribute.value),
                                    name: attribute.name,
                                    id: key,
                                },
                            ],
                        });
                    }
                }
            }

            if (error) {
                return;
            }
            obj.sections_json = JSON.stringify(sections);
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
