import { createContext, createRef, useContext } from "react";
import { ImageUploaderContextType } from "./types";
import { ModalRefType } from "@/types/Modal";

const ImageUploaderContext = createContext<ImageUploaderContextType>({
    image: "",
    ImageRef: createRef<HTMLImageElement>(),
    InputRef: createRef<HTMLInputElement | null>(),
    mimeType: "",
    ModalRef: createRef<ModalRefType>(),
    setImage: () => {},
    setMimeType: () => {},
    isCropped: false,
    setIsCropped: () => {},
    processedImage: { file: null, url: "" },
    setProcessedImage: () => {},
});

export function useImageUploaderContext() {
    const context = useContext(ImageUploaderContext);
    if (!context) {
        throw new Error(
            "ImageUploader.* Component must be rendered as a child of ImageUploader Component"
        );
    }
    return context;
}

export default ImageUploaderContext;
