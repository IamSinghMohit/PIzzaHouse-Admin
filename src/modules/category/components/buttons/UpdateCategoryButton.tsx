import { IconPencilPlus } from "@tabler/icons-react";
import { useUpdateCategory, useCategoryPriceSections } from "../../hooks";
import { Dispatch, SetStateAction, useEffect, memo } from "react";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setFetchedPriceSec } from "@/store/slices/category";
import { FormDataSend } from "@/utils";
import ModalButton from "@/modules/shared/ModalButton";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}

function UpdateCategoryButton({ setIsLoading, processedImage }: Props) {
    const { mutate, isPending } = useUpdateCategory();
    const {
        updated_fields,
        current_selected_category: category,
        category_price_sec,
    } = useAppSelector((state) => state.category);
    const { data } = useCategoryPriceSections(category?.id || "");

    const dispatch = useAppDispatch();

    const handleUpdateCategory = () => {
        if (!category) return;
        FormDataSend(
            {
                id: category.id,
                is_name_updated: `${updated_fields.name}`,
                is_image_updated: `${updated_fields.image}`,
                is_sections_updated: `${updated_fields.sections}`,
                name: category.name,
                image: processedImage.file,
                json: JSON.stringify(category_price_sec),
            },
            mutate
        );
    };

    useEffect(() => {
        if (data) {
            dispatch(setFetchedPriceSec(data.data));
        }
    }, [data]);

    useEffect(() => {
        setIsLoading(isPending);
    }, [isPending]);

    return (
        <ModalButton
            onPress={handleUpdateCategory}
            isLoading={isPending}
            icon={<IconPencilPlus width={20} />}
        >
            Update
        </ModalButton>
    );
}

export default memo(UpdateCategoryButton);
