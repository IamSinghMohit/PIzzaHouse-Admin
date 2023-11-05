import React, { useState, Ref, useImperativeHandle } from "react";
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

interface Props {
    Image: string;
    setImage: (args: { url: string; file: File }) => void;
    MimeType: string;
    aspectRatio?: { width: number; height: number };
}

function ImageUploader(
    { Image, setImage, MimeType, aspectRatio }: Props,
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
    const { updatedFields } = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZoom(Number(e.target.value));
    };

    const handleRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRotation(Number(e.target.value));
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
                if (!updatedFields.image) {
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
            onOpenChange={onOpenChange}
            classNames={{
                closeButton: "z-10",
            }}
        >
            <ModalContent className="pt-1">
                {(onclose) => (
                    <>
                        <ModalBody className="gap-1 relative p-7 pb-0 m-0">
                            <div className="w-full h-[400px] relative rounded-md overflow-hidden border">
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
                            <div className="range-slider gap-2 text-gray-500">
                                <IconWrapper icon={<MdCropRotate />} />
                                <input
                                    type="range"
                                    min={0}
                                    max={360}
                                    step={1}
                                    value={rotation}
                                    onChange={handleRotation}
                                />
                            </div>
                            <div className="range-slider gap-2 text-gray-500">
                                <IconWrapper icon={<BsZoomIn />} />
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={handleSlider}
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
                                show image
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default React.forwardRef(ImageUploader);
