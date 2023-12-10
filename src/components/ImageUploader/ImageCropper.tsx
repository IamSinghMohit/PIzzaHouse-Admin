import React, {
    useState,
    Ref,
    useImperativeHandle,
} from "react";
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
import { ModalRefType } from "@/types/Modal";
import { useImageUploaderContext } from "./context";

interface Props {
    aspectRatio?: { x: number; y: number };
}

function ImageUploader({ aspectRatio }: Props, ref: Ref<ModalRefType>) {
    const {
        setIsCropped,
        isCropped,
        image,
        mimeType,
        setProcessedImage,
    } = useImageUploaderContext();
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation,
                mimeType
            );

            if (croppedImage) {
                setProcessedImage(croppedImage);
                setIsCropped(true);
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
            radius="sm"
            isDismissable={isCropped}
            isKeyboardDismissDisabled={!isCropped}
            hideCloseButton={!isCropped}
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
                                    image={image}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={
                                        aspectRatio
                                            ? aspectRatio.x / aspectRatio.y
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
