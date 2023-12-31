import ImageUploader from "@/components/ImageUploader";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalContent,
    useDisclosure,
    ModalFooter,
} from "@nextui-org/react";
import {
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { TProcessedImage } from "@/types/ImageUploader";
import { TModalRef } from "@/types/Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    TopingCategorySelector,
    TopingNameInput,
    TopingPrice,
    TopingStatusSelector,
} from "../TopingForm";
import { GiCrossFlare } from "react-icons/gi";
import { setTopingState, setTopingUpdatedFields } from "@/store/slices/topings";
import CreateTopingButton from "../button/CreateTopingButton";
import UpdateTopingButton from "../button/UpdateTopingButton";

interface Props {
    type: "Create" | "Update";
}

function TopingModal({ type }: Props, ref: Ref<TModalRef>) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const defaultImage = useAppSelector(
        (state) => state.product.product_management.product_image, //  here will be product
    );
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });

    useImperativeHandle(
        ref,
        () => ({
            isOpen,
            onClose,
            onOpen,
        }),
        [],
    );

    useEffect(() => {
        if (processedImage.file) {
            dispatch(setTopingUpdatedFields({ type: "image", value: true }));
        }
    }, [processedImage.file]);

    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            isDismissable={!isLoading}
            isKeyboardDismissDisabled={!isLoading}
            hideCloseButton={isLoading}
            onOpenChange={onOpenChange}
            onClose={() => {
                setProcessedImage({ url: "", file: null });
                dispatch(
                    setTopingState({
                        type: "SET",
                        data: {
                            id: "",
                            image: "",
                            name: "",
                            category: "",
                            status: "Draft",
                            price: 0,
                        },
                    }),
                );
                dispatch(setTopingUpdatedFields({ type: "ALL", value: false }));
                onClose();
            }}
            radius="sm"
        >
            <ModalContent className="relative">
                {(onClose) => (
                    <>
                        {isLoading && (
                            <div className="modal-overlay w-full h-[530px] absolute"></div>
                        )}
                        <ModalHeader className="flex flex-col gap-1">
                            {type} Toping
                        </ModalHeader>
                        <ModalBody className="flex-row gap-8 justify-between">
                            <div className="flex flex-col gap-3 items-center">
                                <ImageUploader
                                    aspectRatio={{ x: 2, y: 2 }}
                                    processedImage={processedImage}
                                    setProcessedImage={setProcessedImage}
                                    defaultImage={
                                        type == "Update"
                                            ? defaultImage
                                            : undefined
                                    }
                                >
                                    <ImageUploader.PlaceholderContainer
                                        baseClassName="w-[100px] h-[100px]"
                                        placeholderImage={
                                            <ImageUploader.PlaceholderImage imageBeforeClassName="w-[40px] h-[40px]" />
                                        }
                                        placeholderImageText={
                                            <ImageUploader.PlaceholderImageText baseClassName="text-[11px] flex gap-1" />
                                        }
                                    />
                                </ImageUploader>

                                <TopingNameInput />
                                <TopingCategorySelector />
                            </div>
                            <div className="flex items-center gap-3 flex-col">
                                <TopingPrice />
                                <TopingStatusSelector />
                            </div>
                        </ModalBody>
                        <ModalFooter className="px-6 py-2">
                            <Button
                                radius="sm"
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            {type == "Create" ? (
                                <CreateTopingButton
                                    setIsLoading={setIsLoading}
                                    processedImage={processedImage}
                                />
                            ) : (
                                <UpdateTopingButton
                                    setIsLoading={setIsLoading}
                                    processedImage={processedImage}
                                />
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default forwardRef(TopingModal);
