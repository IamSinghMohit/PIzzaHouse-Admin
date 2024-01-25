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
import CategoryPriceSection from "../CategoryPriceSection";
import {
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { TProcessedImage } from "@/types/ImageUploader";
import { TModalRef } from "@/types/Modal";
import CreateCategoryButton from "../buttons/CreateCategoryButton";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    setCategoryImageUpdated,
    setCategorySections,
    setCurrentSelectedCategory,
} from "@/store/slices/category";
import { CategoryInput } from "../../CategoryForm";
import CategoryPriceSectionRenderer from "../CategoryPriceSectionRenderer";

type Props = {};

function CreateCategoryModal({}: Props, ref: Ref<TModalRef>) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
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
            dispatch(setCategoryImageUpdated(false));
        }
    }, [processedImage.file]);

    console.log("create modalrendered");
    return (
        <Modal
            size="5xl"
            isOpen={isOpen}
            isDismissable={!isLoading}
            isKeyboardDismissDisabled={!isLoading}
            onOpenChange={onOpenChange}
            hideCloseButton={isLoading}
            onClose={() => {
                setProcessedImage({ url: "", file: null });
                dispatch(setCurrentSelectedCategory(null));
                dispatch(setCategorySections({ data: [], type: "REPLACE" }));
                dispatch(setCategoryImageUpdated(false));
                onClose();
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
                            Create Category
                        </ModalHeader>
                        <ModalBody className="flex-row justify-between">
                            <div className="flex flex-col gap-3">
                                <ImageUploader
                                    aspectRatio={{ x: 2, y: 2 }}
                                    processedImage={processedImage}
                                    setProcessedImage={setProcessedImage}
                                >
                                    <ImageUploader.PlaceholderContainer
                                        baseClassName="w-[150px] h-[150px]"
                                        placeholderImage={
                                            <ImageUploader.PlaceholderImage imageBeforeClassName="w-[80px] h-[80px]" />
                                        }
                                        placeholderImageText={
                                            <ImageUploader.PlaceholderImageText baseClassName="text-[16px] flex gap-1" />
                                        }
                                    />
                                </ImageUploader>
                                <CategoryInput />
                                <CategoryPriceSection />
                            </div>
                            <div className="overflow-y-scroll space-y-3 max-h-[400px] pr-2">
                                <CreateCategoryModalPriceSectionRenderer />
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
                            <CreateCategoryButton
                                onClose={onClose}
                                setIsLoading={setIsLoading}
                                processedImage={processedImage}
                            />
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default forwardRef(CreateCategoryModal);

function CreateCategoryModalPriceSectionRenderer() {
    const priceSections = useAppSelector(
        (state) => state.category.category_price_sec,
    );
    return (
        <CategoryPriceSectionRenderer
            renderDeleteButton={true}
            priceSections={priceSections}
        />
    );
}
