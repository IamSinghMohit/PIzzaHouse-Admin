import React, { useEffect, useRef, useState ,Dispatch,SetStateAction} from "react";
import uploadImage from "@/assets/upload.png";
import { TbDragDrop } from "react-icons/tb";
import { Button } from "@nextui-org/react";
import { PiGearSixLight } from "react-icons/pi";
import ImageCropper from "./ImageCropper";
import { ModalRefType } from "@/schema/modal";
import { ProcessedImageType } from "@/schema/ImageUploader";

interface Props {
    width?: string;
    height?: string;
    type: "product" | "category";
    processedImage:{
        file:unknown;
        url:string
    };
    defaultImage?:string;
    aspectRatio?: { width: number; height: number };
    setProcessedImage:Dispatch<SetStateAction<ProcessedImageType>>
}

function ImageUploader({ width, height, type ,processedImage,setProcessedImage,aspectRatio,defaultImage}: Props) {
    // this is for image element to change its content
    const ImageRef = useRef<HTMLImageElement | null>(null);
    // this is input ref with display none and type file to accept file from user upon click on the image
    const InputRef = useRef<HTMLInputElement | null>(null);
    // this ref is for modal
    const ModalRef = useRef<ModalRefType>(null);
    /*
     * it is utility state using this i will be rendering grear icon and and it will be assinged a image url
     * and i will be passsing this state to my ImageCropper component which will use image url for further processig
     */
    const [Image, setImage] = useState("");
    const [mimeType, setMimeType] = useState("");

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const { files } = event.dataTransfer;

        if (files.length > 0) {
            setMimeType(`${files[0].type}`);
            const selectedFile = files[0]; // Assuming you're handling a single image
            const imageURL = URL.createObjectURL(selectedFile);
            setImage(imageURL);

            if (ImageRef.current) {
                ImageRef.current.src = imageURL;
                ModalRef.current?.onOpen();
            }
        }
    }

    function HandleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const { files } = event.target;

        if (files && files.length > 0) {
            setMimeType(`${files[0].type}`);
            const selectedFile = files[0]; // Assuming you're handling a single image
            const imageURL = URL.createObjectURL(selectedFile);
            setImage(imageURL);

            if (ImageRef.current) {
                ImageRef.current.src = imageURL;
                ModalRef.current?.onOpen();
            }
        }

        if (InputRef.current) {
            InputRef.current.value = "";
        }
    }

    function handleImageChange() {
        ModalRef.current?.onOpen();
    }

    useEffect(() => {
        if(defaultImage){
            if(ImageRef.current) ImageRef.current.src = defaultImage
            setImage(defaultImage)
        }
    },[])

    useEffect(() => {
        if (processedImage?.url) {
            if (ImageRef.current) ImageRef.current.src = processedImage.url as string;
        }
    }, [processedImage, processedImage?.url]);

    return (
        <div>
            <div
                className={`${
                    type == "product"
                        ? "w-[240px] h-[230px]"
                        : "w-[150px] h-[115px]"
                } ${
                    width || (height && `w-[${width}] h-[${height}]`)
                } border-2 rounded-md ${
                    !Image && "p-2"
                } relative rounded-tr-none`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-between h-full"
                >
                    <img
                        src={defaultImage || uploadImage}
                        className={`${
                            Image ? "w-full h-full" : "w-1/2 h-1/2 m-auto object-cover"
                        }`}
                        alt="upload_image"
                        ref={ImageRef}
                    />
                    {!Image && (
                        <span
                            className={`text-gray-400 flex mb-2 ${
                                type == "category" && "text-xs"
                            }`}
                        >
                            Drop{" "}
                            <span
                                className={`mx-1 ${
                                    type == "category" ? "text-lg" : "text-2xl"
                                }`}
                            >
                                <TbDragDrop />
                            </span>{" "}
                            or click here
                        </span>
                    )}
                </label>
                {Image && (
                    <Button
                        isIconOnly
                        className="absolute -top-0 -right-[40px] rounded-l-none text-2xl bg-primaryOrange text-white"
                        onClick={handleImageChange}
                    >
                        <PiGearSixLight />
                    </Button>
                )}
            </div>
            <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={HandleInputChange}
                ref={InputRef}
            />
            <ImageCropper
                ref={ModalRef}
                Image={Image}
                setImage={setProcessedImage}
                MimeType={mimeType}
                aspectRatio={aspectRatio}
            />
        </div>
    );
}

export default ImageUploader;
