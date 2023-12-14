import { Button } from "@nextui-org/react";
import { useCreateCategory } from "../../hooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppSelector } from "@/hooks/state";
import { FormDataSend } from "@/utils";
import { errorToast } from "@/lib/toast";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}

function CreateCategoryButton({ setIsLoading, processedImage }: Props) {
    const { mutate, isPending } = useCreateCategory();
    const { category_price_sec, category_name } = useAppSelector(
        (state) => state.category
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
            mutate
        );
    }

    useEffect(() => {
        setIsLoading(isPending);
    }, [isPending]);

    return (
        <Button
            radius="sm"
            isLoading={isPending}
            color="primary"
            className="text-white category-modal-button"
            onPress={handleCreate}
        >
            Create
        </Button>
    );
}

export default CreateCategoryButton;
