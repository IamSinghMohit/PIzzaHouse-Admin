import { TModalRef } from "@/types/Modal";
import { TProcessedImage } from "@/types/ImageUploader";
import { SetStateAction, Dispatch, RefObject } from "react";

export type ImageUploaderContextType = {
    image: string;
    setImage: Dispatch<SetStateAction<string>>;
    ImageRef: RefObject<HTMLImageElement>;
    InputRef: RefObject<HTMLInputElement | null>;
    mimeType: string;
    setMimeType: Dispatch<SetStateAction<string>>;
    ModalRef: RefObject<TModalRef >;
    isCropped: boolean;
    setIsCropped: Dispatch<SetStateAction<boolean>>;
    processedImage: {
        file: unknown;
        url: string;
    };
    setProcessedImage: Dispatch<SetStateAction<TProcessedImage >>;
};
