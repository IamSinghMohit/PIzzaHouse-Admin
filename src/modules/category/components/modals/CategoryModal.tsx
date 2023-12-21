import ImageUploader from "@/components/ImageUploader";
import {
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalContent,
    useDisclosure,
    ModalFooter,
} from "@nextui-org/react";
import CategoryPriceSection from "../CategoryPriceSection";
import RenderCateogryPriceSection from "../RenderCategoryPriceSection";
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
    setCategoryName,
    setCategorySections,
    setCurrentSelectedCategory,
    setUpdatedFields,
} from "@/store/slices/category";
import UpdateCategoryButton from "../buttons/UpdateCategoryButton";
import useDebounce from "@/hooks/useDebounce";

function CategoryInput() {
    const [value, setValue] = useState("");
    const currentCategory = useAppSelector(
        (state) => state.category.current_selected_category
    );
    const dispatch = useAppDispatch();
    const debounce = useDebounce(value, 300);

    useEffect(() => {
        if (debounce) {
            dispatch(setCategoryName(debounce));
        }
    }, [debounce]);

    return (
        <Input
            label="Name"
            radius="sm"
            size="sm"
            className="w-[200px]"
            value={value ? value : currentCategory?.name}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

interface Props {
    type: "Create" | "Update";
}

function CategoryModal({ type }: Props, ref: Ref<TModalRef>) {
    const { isOpen, onOpen, onClose ,onOpenChange} = useDisclosure();
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
            dispatch(setUpdatedFields({ type: "image", value: true }));
        }
    }, [processedImage.file]);

    console.log("model itself rendered");
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
                dispatch(setUpdatedFields({ type: "all", value: false }));
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
                            {type} Category
                        </ModalHeader>
                        <ModalBody className="flex-row justify-between">
                            <div className="flex flex-col gap-3">
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
                                <CategoryInput />
                                <CategoryPriceSection />
                            </div>
                            <div className="overflow-y-scroll space-y-3 max-h-[400px] pr-2">
                                <RenderCateogryPriceSection />
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
                                <CreateCategoryButton
                                    setIsLoading={setIsLoading}
                                    processedImage={processedImage}
                                />
                            ) : (
                                <UpdateCategoryButton
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

export default forwardRef(CategoryModal);
