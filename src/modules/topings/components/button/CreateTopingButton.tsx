import ModalButton from "@/modules/commponents/ModalButton";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormDataSend } from "@/utils";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppSelector } from "@/hooks/state";
import { errorToast } from "@/lib/toast";
import { useCreateToping } from "../../hooks/useCreateToping";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
    onSuccess?:() => void;
}

function CreateTopingButton({ setIsLoading, processedImage ,onSuccess}: Props) {
    const { mutate, isPending ,data} = useCreateToping();
    const { toping_management, categories } = useAppSelector(
        (state) => state.toping,
    );
    const topingCategoryArray = Object.keys(categories )

    function handleCreate() {
        if (!processedImage.file) {
            return errorToast("image is required");
        } else if (!toping_management.name) {
            return errorToast("name is required");
        } else if (!toping_management.price) {
            return errorToast("price is required");
        } else if (topingCategoryArray.length === 0) {
            return errorToast("category is required");
        }

        FormDataSend(
            {
                name: toping_management.name,
                categories_json:JSON.stringify(topingCategoryArray),
                status: toping_management.status,
                image: processedImage.file,
                price: toping_management.price,
            },
            mutate,
        );
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
        <ModalButton isLoading={isPending} onPress={handleCreate}>
            Create
        </ModalButton>
    );
}

export default CreateTopingButton;
