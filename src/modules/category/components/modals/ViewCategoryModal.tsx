import ImageUploader from "@/components/ImageUploader";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalContent,
    useDisclosure,
    ModalFooter,
    Input,
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
    setCategoryImageUpdated,
    setCategorySections,
    setCurrentSelectedCategory,
} from "@/store/slices/category";
import UpdateCategoryButton from "../buttons/UpdateCategoryButton";
import CategoryPriceSectionRenderer from "../CategoryPriceSectionRenderer";
import { useCategoryPriceSections } from "../../hooks";
type Props = {};

function ViewCategoryModel({}: Props, ref: Ref<TModalRef>) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(
        (state) => state.category.current_selected_category,
    );
    const { data = [] } = useCategoryPriceSections(currentCategory?.id || "");
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
            dispatch(setCategoryImageUpdated(true));
        }
    }, [processedImage.file]);

    const isSectionExist = data.length > 0;
    return (
        <Modal
            size={isSectionExist ? "4xl" : "sm"}
            isOpen={isOpen}
            scrollBehavior="inside"
            isDismissable={!isLoading}
            isKeyboardDismissDisabled={!isLoading}
            onOpenChange={onOpenChange}
            hideCloseButton={isLoading}
            onClose={() => {
                setProcessedImage({ url: "", file: null });
                dispatch(setCurrentSelectedCategory(null));
                dispatch(setCategorySections({ data: [], type: "REPLACE" }));
                onClose();
            }}
            radius="sm"
            className={isSectionExist ? "h-[530px]" : ""}
        >
            <ModalContent className="relative">
                {(onClose) => (
                    <>
                        {isLoading && (
                            <div className="modal-overlay w-full h-[530px] absolute"></div>
                        )}
                        <ModalHeader className="flex flex-col gap-1">
                            View Category
                        </ModalHeader>
                        <ModalBody
                            className={`items-center gap-5 ${
                                isSectionExist
                                    ? "md:justify-between md:items-start md:flex-row"
                                    : ""
                            }`}
                        >
                            <div className="max-w-[250px] flex flex-col items-center gap-3 md:h-full md:justify-center">
                                <ImageUploader
                                    aspectRatio={{ x: 2, y: 2 }}
                                    processedImage={processedImage}
                                    setProcessedImage={setProcessedImage}
                                    defaultImage={currentCategory?.image}
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
                                <Input value={"hello"} disabled />
                            </div>
                            {isSectionExist && (
                                <>
                                    <Divider
                                        orientation="vertical"
                                        className="hidden md:block"
                                    />
                                    <div className="overflow-y-scroll space-y-3 max-h-[400px] pr-2">
                                        <CategoryPriceSectionRenderer
                                            priceSections={data}
                                            renderDeleteButton={false}
                                        />
                                    </div>
                                </>
                            )}
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
                            {processedImage.url && (
                                <UpdateCategoryButton
                                    onClose={onClose}
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

export default forwardRef(ViewCategoryModel);
