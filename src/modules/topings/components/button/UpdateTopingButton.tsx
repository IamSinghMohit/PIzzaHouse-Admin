import ModalButton from "@/modules/commponents/ModalButton";
import { TProcessedImage } from "@/types/ImageUploader";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppSelector } from "@/hooks/state";
import { IconPencilPlus } from "@tabler/icons-react";
import { FormDataSend } from "@/utils";
import { useUpdateToping } from "../../hooks/useUpdateToping";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
    onSuccess?: () => void;
}

function UpdateTopingButton({
    setIsLoading,
    processedImage,
    onSuccess,
}: Props) {
    const { mutate, data, isPending } = useUpdateToping();

    const { updated_fields, toping_management } = useAppSelector(
        (state) => state.toping,
    );

    function handleUpdateProduct() {
        const obj: any = {
            id: toping_management.id,
            ...(updated_fields.name ? { name: toping_management.name } : {}),
            ...(updated_fields.price ? { price: toping_management.price } : {}),
            ...(updated_fields.image ? { image: processedImage.file } : {}),
            ...(updated_fields.status ? { status: toping_management.status} : {}),
        };
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
            isLoading={false}
            icon={<IconPencilPlus width={20} />}
        >
            Update
        </ModalButton>
    );
}

export default UpdateTopingButton;
