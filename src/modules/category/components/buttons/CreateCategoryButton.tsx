import { useCreateCategory } from "../../hooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppSelector } from "@/hooks/state";
import { FormDataSend } from "@/utils";
import { errorToast } from "@/lib/toast";
import ModalButton from "@/modules/commponents/ModalButton";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
    onClose: () => void;
}

function CreateCategoryButton({
    setIsLoading,
    processedImage,
    onClose,
}: Props) {
    const { mutate, isPending, data } = useCreateCategory();
    const { category_price_sec, category_name } = useAppSelector(
        (state) => state.category,
    );

    function handleCreate() {
        if (!processedImage.file) {
            return errorToast("image is required");
        } else if (!category_name) {
            return errorToast("name is required");
        }
        FormDataSend(
            {
                image: processedImage.file,
                name: category_name,
                json: JSON.stringify(category_price_sec),
            },
            mutate,
        );
    }

    useEffect(() => {
        setIsLoading(isPending);
        if (data) {
            onClose();
        }
    }, [isPending]);

    return (
        <ModalButton isLoading={isPending} onPress={handleCreate}>
            Create
        </ModalButton>
    );
}

export default CreateCategoryButton;
