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
import { ProductDescriptionInput, ProductNameInput } from "../ProductForm";
import { setProductUpdatedFields } from "@/store/features/productSlice";
import CreateProductButton from "../button/CreateProductButton";
import UpdateProductButton from "../button/UpdateProductButton";

interface Props {
    type: "Create" | "Update";
}

function ProductModal({ type }: Props, ref: Ref<TModalRef>) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const defaultImage = useAppSelector(
        (state) => state.category.current_selected_category?.image
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
        []
    );

    useEffect(() => {
        if (processedImage.file) {
            dispatch(
                setProductUpdatedFields({ type: "product_image", value: true })
            );
        }
    }, [processedImage.file]);

    return (
        <Modal
            size="5xl"
            isOpen={isOpen}
            isDismissable={!isLoading}
            isKeyboardDismissDisabled={!isLoading}
            hideCloseButton={isLoading}
            onClose={() => {
                setProcessedImage({ url: "", file: null });
                // dispatch(setCurrentSelectedCategory(null));
                // dispatch(setCategorySections({ data: [], type: "REPLACE" }));
                // dispatch(setUpdatedFields({ type: "all", value: false }));
                // onClose();
            }}
            radius="sm"
            className="h-[530px]"
        >
            <ModalContent className="relative">
                {(onClose) => (
                    <>
                        {isLoading && (
                            <div className="modal-overlay w-full h-[530px] absolute"></div>
                        )}
                        <ModalHeader className="flex flex-col gap-1">
                            {type} Category
                        </ModalHeader>
                        <ModalBody className="flex-row justify-between">
                            <div className="flex flex-col gap-3">
                                <ImageUploader
                                    aspectRatio={{ x: 4, y: 3 }}
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
                                <div>
                                    <ProductNameInput />
                                    <ProductDescriptionInput />
                                </div>
                                <div>
                                    Rendering product form(input desc..)
                                </div>
                            </div>
                            <div className="overflow-y-scroll space-y-3 max-h-[400px] pr-2">
                                Rendering product sectoins
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
                                <CreateProductButton
                                    setIsLoading={setIsLoading}
                                    processedImage={processedImage}
                                />
                            ) : (
                                <UpdateProductButton
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

export default forwardRef(ProductModal);
