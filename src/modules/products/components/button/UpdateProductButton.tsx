import ModalButton from "@/modules/shared/ModalButton";
import { TProcessedImage } from "@/types/ImageUploader";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    processedImage: TProcessedImage;
}



function UpdateProductButton({}: Props) {
    return (
        <ModalButton isLoading={false} onPress={() => {}}>
            Update
        </ModalButton>
    );
}

export default UpdateProductButton;
