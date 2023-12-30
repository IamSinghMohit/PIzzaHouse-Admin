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
}

function CreateTopingButton({ setIsLoading, processedImage }: Props) {
    const { mutate, isPending } = useCreateToping();
    const { toping_management } = useAppSelector((state) => state.toping);

    function handleCreate() {
        if (!processedImage.file) {
            return errorToast("image is required");
        } else if (!toping_management.name) {
            return errorToast("name is required");
        } else if (!toping_management.price) {
            return errorToast("price is required");
        }

        FormDataSend(
            {
                name: toping_management.name,
                category: toping_management.category.split(":")[1],
                status: toping_management.status,
                image: processedImage.file,
                price: toping_management.price,
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

export default  CreateTopingButton;
