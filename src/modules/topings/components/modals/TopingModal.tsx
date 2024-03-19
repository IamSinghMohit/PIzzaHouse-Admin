import ImageUploader from "@/components/ImageUploader";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalContent,
    useDisclosure,
    ModalFooter,
    Divider,
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
import {
    setTopingCategories,
    setTopingState,
    setTopingUpdatedFields,
} from "@/store/slices/topings";
import CreateTopingButton from "../button/CreateTopingButton";
import { StatusEnum } from "@/modules/types/inex";
import TopingCategoryRenderer from "../TopingCategoryRenderer";
import ToggledUpdateTopingButton from "../button/ToggledUpdateTopingButton";

interface Props {
    type: "Create" | "Update";
}

function TopingModal({ type }: Props, ref: Ref<TModalRef>) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const defaultImage = useAppSelector(
        (state) => state.toping.toping_management.image,
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
            size="2xl"
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
                            status: StatusEnum.DRAFT,
                            price: 0,
                        },
                    }),
                );
                dispatch(setTopingCategories({}));
                dispatch(setTopingUpdatedFields({ type: "ALL", value: false }));
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
                        <ModalBody className="flex-row justify-center gap-8 sm:justify-between flex-wrap">
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
                                        baseClassName="w-[180px] h-[180px]"
                                        placeholderImage={
                                            <ImageUploader.PlaceholderImage imageBeforeClassName="w-[100px] h-[100px]" />
                                        }
                                        placeholderImageText={
                                            <ImageUploader.PlaceholderImageText baseClassName="text-[16px] flex gap-1" />
                                        }
                                    />
                                </ImageUploader>

                                <TopingNameInput />
                                <TopingCategoryRenderer className="min-w-[280px] min-[280px]" />
                            </div>
                            <Divider orientation="vertical" />
                            <div className="flex gap-3 flex-col items-end">
                                <TopingPrice />
                                <TopingStatusSelector />
                                <TopingCategorySelector />
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
                                    onSuccess={onClose}
                                />
                            ) : (
                                <ToggledUpdateTopingButton
                                    setIsLoading={setIsLoading}
                                    processedImage={processedImage}
                                    onSuccess={onClose}
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
