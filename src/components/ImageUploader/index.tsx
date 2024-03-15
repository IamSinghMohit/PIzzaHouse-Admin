import React, {
    useEffect,
    useRef,
    useState,
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";
import placeholderImage from "@/assets/upload.png";
import { Button } from "@nextui-org/react";
import ImageCropper from "./ImageCropper";
import ImageUploaderContext, { useImageUploaderContext } from "./context";
import { TProcessedImage } from "@/types/ImageUploader";
import { TModalRef } from "@/types/Modal";
import { IconDragDrop } from "@tabler/icons-react";
import { GearIcon } from "@/icons";

function PlaceholderContainer({
    baseClassName,
    placeholderImage,
    placeholderImageText,
}: {
    placeholderImage: ReactNode;
    placeholderImageText: ReactNode;
    baseClassName?: string;
}) {
    const { ImageRef, setMimeType, setImage, setIsCropped, ModalRef, image } =
        useImageUploaderContext();

    function handleImageChange() {
        ModalRef.current?.onOpen();
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const { files } = event.dataTransfer;

        if (files.length > 0) {
            setMimeType(`${files[0].type}`);
            const selectedFile = files[0]; // Assuming you're handling a single image
            const imageURL = URL.createObjectURL(selectedFile);
            setImage(imageURL);
            setIsCropped(false);
            if (ImageRef.current) {
                ImageRef.current.src = imageURL;
                ModalRef.current?.onOpen();
            }
        }
    }

    return (
        <div
            className={`relative ` + baseClassName}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-between h-full border-2 rounded-md rounded-tr-none overflow-hidden ${
                    !image && "p-2"
                } `}
            >
                {placeholderImage}
                {!image && placeholderImageText}
            </label>
            {image && (
                <Button
                    isIconOnly
                    className="absolute top-0 -right-[39px] rounded-l-none text-2xl bg-primaryOrange text-white"
                    onClick={handleImageChange}
                >
                    <GearIcon/>
                </Button>
            )}
        </div>
    );
}

function PlaceholderImage({
    imageBeforeClassName,
    imageAfterClassName,
}: {
    imageBeforeClassName?: string;
    imageAfterClassName?: string;
}) {
    const { image, ImageRef } = useImageUploaderContext();
    return (
        <img
            src={image}
            className={`${image ? imageAfterClassName : imageBeforeClassName}`}
            alt="upload image"
            ref={ImageRef}
        />
    );
}

function PlaceholderImageText({
    baseClassName,
    iconClassName,
}: {
    baseClassName?: string;
    iconClassName?: string;
}) {
    return (
        <span className={baseClassName + " text-gray-400"}>
            Drop{" "}
            <span className={iconClassName}>
                <IconDragDrop/>
            </span>{" "}
            or click here
        </span>
    );
}

interface Props {
    processedImage: {
        file: unknown;
        url: string;
    };
    defaultImage?: string;
    aspectRatio?: { x: number; y: number };
    setProcessedImage: Dispatch<SetStateAction<TProcessedImage>>;
    children: ReactNode;
}

function ImageUploader({
    processedImage,
    setProcessedImage,
    aspectRatio,
    defaultImage,
    children,
}: Props) {
    // this is for image element to change its content
    const ImageRef = useRef<HTMLImageElement>(null);
    // this is input ref with display none and type file to accept file from user upon click on the image
    const InputRef = useRef<HTMLInputElement | null>(null);
    // this ref is for modal
    const ModalRef = useRef<TModalRef>(null);
    const [isCropped, setIsCropped] = useState(false);
    /*
     * it is utility state using this will be rendering grear icon and and it will be assinged a image url
     * and i will be passsing this state to my ImageCropper component which will use image url for further processig
     */
    const [image, setImage] = useState("");
    const [mimeType, setMimeType] = useState("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const { files } = event.target;

        if (files && files.length > 0) {
            setMimeType(`${files[0].type}`);
            const selectedFile = files[0]; // Assuming you're handling a single image
            const imageURL = URL.createObjectURL(selectedFile);
            setImage(imageURL);
            setIsCropped(false);
            if (ImageRef.current) {
                ImageRef.current.src = imageURL;
                ModalRef.current?.onOpen();
            }
        }

        if (InputRef.current) {
            InputRef.current.value = "";
        }
    }

    useEffect(() => {
        if (defaultImage) {
            if (ImageRef.current) ImageRef.current.src = defaultImage;
            setImage(defaultImage);
        } else {
            if (ImageRef.current) ImageRef.current.src = placeholderImage;
        }
    }, []);

    useEffect(() => {
        if (processedImage?.url) {
            if (ImageRef.current)
                ImageRef.current.src = processedImage.url as string;
        }
    }, [processedImage, processedImage?.url]);

    return (
        <ImageUploaderContext.Provider
            value={{
                image,
                setImage,
                ImageRef,
                InputRef,
                mimeType,
                setProcessedImage,
                processedImage,
                isCropped,
                setIsCropped,
                setMimeType,
                ModalRef,
            }}
        >
            <div>
                {children}
                <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleInputChange}
                    ref={InputRef}
                />
                <ImageCropper aspectRatio={aspectRatio} ref={ModalRef} />
            </div>
        </ImageUploaderContext.Provider>
    );
}

ImageUploader.PlaceholderContainer = PlaceholderContainer;
ImageUploader.PlaceholderImage = PlaceholderImage;
ImageUploader.PlaceholderImageText = PlaceholderImageText;

export default ImageUploader;
