import React, { useState, Ref, useImperativeHandle } from "react";
import { Slider } from "@nextui-org/react";
import { MdCropRotate } from "react-icons/md";
import { BsZoomIn } from "react-icons/bs";

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    useDisclosure,
    ModalFooter,
} from "@nextui-org/react";
import Cropper, { Point, Area } from "react-easy-crop";
import getCroppedImg from "@/components/ImageUploader/helper/getCroppedImage";
import IconWrapper from "../IconWrapper";
import { ModalRefType } from "@/schema/modal";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setUpdatedFields } from "@/store/features/categorySlice";
import {Dispatch,SetStateAction} from "react"

interface Props {
    Image: string;
    setImage: (args: { url: string; file: File }) => void;
    MimeType: string;
    aspectRatio?: { width: number; height: number };
    uploaded:boolean;
    setUploaded:Dispatch<SetStateAction<boolean>>
}

function ImageUploader(
    { Image, setImage, MimeType, aspectRatio ,setUploaded,uploaded}: Props,
    ref: Ref<ModalRefType>
) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const { updated_fields } = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleZoom = (e: unknown) => {
        if (typeof e === "number") {
            setZoom(e);
        }
    };
    const handleRotation = (e: unknown) => {
        if (typeof e === "number") {
            setRotation(e);
        }
    };

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                Image,
                croppedAreaPixels,
                rotation,
                MimeType
            );

            if (croppedImage) {
                setImage(croppedImage);
               setUploaded(true) 
                if (!updated_fields.image) {
                    dispatch(setUpdatedFields("image"));
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    useImperativeHandle(
        ref,
        () => {
            return { onOpen, isOpen, onClose };
        },
        []
    );

    return (
        <Modal
            isOpen={isOpen}
            isDismissable={uploaded}
            isKeyboardDismissDisabled={!uploaded}
            hideCloseButton={!uploaded}
            onOpenChange={onOpenChange}
            classNames={{
                closeButton: "z-10",
            }}
        >
            <ModalContent className="pt-1">
                {(onclose) => (
                    <>
                        <ModalBody className="gap-1 relative p-7 pb-0 m-0">
                            <div className="w-full h-[200px] relative rounded-md overflow-hidden border">
                                <Cropper
                                    image={Image}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={
                                        aspectRatio
                                            ? aspectRatio.width /
                                              aspectRatio.height
                                            : 4 / 3
                                    }
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>
                            <div className=" flex gap-2 flex-col text-gray-400 mx-1 mt-1">
                                <Slider
                                    startContent={
                                        <IconWrapper icon={<MdCropRotate />} />
                                    }
                                    aria-label="crop slider"
                                    size="sm"
                                    minValue={0}
                                    maxValue={360}
                                    step={1}
                                    value={rotation}
                                    onChange={handleRotation}
                                />
                                <Slider
                                    startContent={
                                        <IconWrapper icon={<BsZoomIn />} />
                                    }
                                    aria-label="zoom slider"
                                    size="sm"
                                    minValue={1}
                                    maxValue={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={handleZoom}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter className="p-2 px-7">
                            <Button
                                onClick={showCroppedImage}
                                color="primary"
                                className="text-white"
                                onPress={onclose}
                            >
                                Crop image
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default React.forwardRef(ImageUploader);
