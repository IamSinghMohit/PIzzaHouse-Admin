import { IconPencilPlus } from "@tabler/icons-react";
import { useUpdateCategory } from "../../hooks";
import { Dispatch, SetStateAction, useEffect, memo } from "react";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppSelector } from "@/hooks/state";
import { FormDataSend } from "@/utils";
import ModalButton from "@/modules/commponents/ModalButton";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}

function UpdateCategoryButton({ setIsLoading, processedImage }: Props) {
    const { mutate, isPending } = useUpdateCategory();
    const { is_image_updated, current_selected_category } = useAppSelector(
        (state) => state.category,
    );

    const handleUpdateCategory = () => {
        if (!is_image_updated || !current_selected_category) return;
        FormDataSend(
            {
                image: processedImage.file,
                id: current_selected_category.id,
            },
            mutate,
        );
    };

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
