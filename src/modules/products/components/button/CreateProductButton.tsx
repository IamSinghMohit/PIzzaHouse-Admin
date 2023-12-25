import ModalButton from "@/modules/shared/ModalButton";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormDataSend } from "@/utils";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { errorToast } from "@/lib/toast";
import { setProductPriceSectionAttribute } from "@/store/slices/product";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}

function CreateProductButton({ setIsLoading, processedImage }: Props) {
    const { mutate, isPending } = useCreateProduct();
    const { product_management, default_prices } = useAppSelector(
        (state) => state.product,
    );
    const product_price_section_attribute = useAppSelector(
        (state) => state.product.product_price_section_attribute,
    );
    const product_featured = useAppSelector(
        (state) => state.product.product_management.product_featured,
    );
    const dispatch = useAppDispatch();
    const category = useAppSelector(
        (state) => state.product.current_selections.current_category_id,
    );

    function handleCreate() {
        if (!processedImage.file) {
            return errorToast("image is required");
        } else if (!product_management.product_name) {
            return errorToast("name is required");
        } else if (!product_management.product_description) {
            return errorToast("description is required");
        }

        let error = false;
        //       validation kicks in
        const DefaultPriceAttributesArray: any =[];
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

        if (error) {
            return;
        }
        FormDataSend(
            {
                name: product_management.product_name,
                category: category.split(":")[1],
                description: product_management.product_description,
                status: product_management.product_status,
                sections_json: JSON.stringify(sections),
                image: processedImage.file,
                price: product_management.product_price,
                featured: product_featured,
                default_attributes_json: JSON.stringify(DefaultPriceAttributesArray),
            },
            mutate,
        );
    }
    useEffect(() => {
        if (isPending) {
            setIsLoading(true);
        } else if (!isPending) {
            setIsLoading(false);
        }
    }, [isPending]);

    return (
        <ModalButton isLoading={isPending} onPress={handleCreate}>
            Create
        </ModalButton>
    );
}

export default CreateProductButton;
