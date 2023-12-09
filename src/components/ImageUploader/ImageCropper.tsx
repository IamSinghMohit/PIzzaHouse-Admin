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
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { ModalRefType } from "@/types/Modal";
import { setUpdatedFields } from "@/store/features/categorySlice";
import {Dispatch,SetStateAction} from "react"

interface Props {
    Image: string;
    setImage: (args: { url: string; file: File }) => void;
    MimeType: string;
    aspectRatio?: { x: number; y: number };
    cropped:boolean;
    setIsCropped:Dispatch<SetStateAction<boolean>>
}

function ImageUploader(
    { Image, setImage, MimeType, aspectRatio ,setIsCropped,cropped}: Props,
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
               setIsCropped(true) 
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
            isDismissable={cropped}
            isKeyboardDismissDisabled={!cropped}
            hideCloseButton={!cropped}
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
                                            ? aspectRatio.x /
                                              aspectRatio.y
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
                                    onChange={(e) => setRotation(e as number)}
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
                                    onChange={(e) => setZoom(e as number)}
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
