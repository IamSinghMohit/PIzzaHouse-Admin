import { ProcessedImageType } from "@/types/ImageUploader";
import { ModalRefType } from "@/types/Modal";
import { SetStateAction, Dispatch, RefObject } from "react";

export type ImageUploaderContextType = {
    image: string;
    setImage: Dispatch<SetStateAction<string>>;
    ImageRef: RefObject<HTMLImageElement>;
    InputRef: RefObject<HTMLInputElement | null>;
    mimeType: string;
    setMimeType: Dispatch<SetStateAction<string>>;
    ModalRef: RefObject<ModalRefType>;
    isCropped: boolean;
    setIsCropped: Dispatch<SetStateAction<boolean>>;
    processedImage: {
        file: unknown;
        url: string;
    };
    setProcessedImage: Dispatch<SetStateAction<ProcessedImageType>>;
};
