import ModalButton from "@/modules/commponents/ModalButton";
import { TProcessedImage } from "@/types/ImageUploader";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { IconPencilPlus } from "@tabler/icons-react";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { FormDataSend } from "@/utils";
import { errorToast } from "@/lib/toast";
import { setProductPriceSectionAttribute } from "@/store/slices/product";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}

function UpdateProductButton({ setIsLoading, processedImage }: Props) {
    const dispatch = useAppDispatch();
    const { mutate, isPending } = useUpdateProduct();
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
        if (updated_fields.product_category) {
            let error = false;
            //       validation kicks in
            const DefaultPriceAttributesArray: any = [];
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
                if (default_prices[attribute.section].id === key && !error) {
                    DefaultPriceAttributesArray.push({
                        name: attribute.name,
                        id: key,
                        section: attribute.section,
                    });
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
            obj.default_attributes_json = JSON.stringify(
                DefaultPriceAttributesArray,
            );
            obj.sections_json = JSON.stringify(sections);
        }
        if (
            updated_fields.product_default_attributes &&
            !updated_fields.product_category
        ) {
            const arr = [];
            for (let key in default_prices) {
                arr.push({
                    name: default_prices[key].name,
                    id: default_prices[key].id,
                    section: default_prices[key].section,
                });
            }
            obj.default_attributes_json = JSON.stringify(arr);
        }
        FormDataSend(obj, mutate, { id: product_management.product_id });
    }

    useEffect(() => {
        setIsLoading(isPending);
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
