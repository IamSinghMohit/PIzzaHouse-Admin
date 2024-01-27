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
    Ref,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { TProcessedImage } from "@/types/ImageUploader";
import { TModalRef } from "@/types/Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    ProductCategorySelector,
    ProductCheck,
    ProductDescriptionInput,
    ProductNameInput,
    ProductPrice,
    ProductStatusSelector,
} from "../ProductForm";
import {
    setCurrentProductCategory,
    setDefaultProductPrices,
    setProductPriceSectionAttribute,
    setProductState,
    setProductUpdatedFields,
} from "@/store/slices/product";
import CreateProductButton from "../button/CreateProductButton";
import UpdateProductButton, {
    TUpdateProductButtonProps,
} from "../button/UpdateProductButton";
import ProductPriceSectionRender from "../ProductPriceSectionRender";
import { TProductUpdatedFields } from "@/store/slices/product/types";

interface Props {
    type: "Create" | "Update";
}

function ProductModal({ type }: Props, ref: Ref<TModalRef>) {
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
            dispatch(
                setProductUpdatedFields({ type: "product_image", value: true }),
            );
        }
    }, [processedImage.file]);

    return (
        <Modal
            isOpen={isOpen}
            size="5xl"
            isDismissable={!isLoading}
            scrollBehavior="inside"
            isKeyboardDismissDisabled={!isLoading}
            hideCloseButton={isLoading}
            onOpenChange={onOpenChange}
            onClose={() => {
                setProcessedImage({ url: "", file: null });
                dispatch(
                    setProductState({
                        type: "SET",
                        data: {
                            product_id: "",
                            product_name: "",
                            product_image: "",
                            product_category: "",
                            product_featured: false,
                            product_status: "Draft",
                            product_price: 0,
                            product_description: "",
                        },
                    }),
                );
                dispatch(
                    setProductPriceSectionAttribute({ type: "SET", data: [] }),
                );
                dispatch(setCurrentProductCategory(null));
                dispatch(setDefaultProductPrices({ type: "SET", data: [] }));
                dispatch(
                    setProductUpdatedFields({ type: "ALL", value: false }),
                );
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
                            {type} Product
                        </ModalHeader>
                        <ModalBody className="flex-row gap-8 justify-center">
                            <div className="flex flex-col gap-3 min-w-[450px]">
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
                                        baseClassName="w-[250px] h-[188px] mx-auto"
                                        placeholderImage={
                                            <ImageUploader.PlaceholderImage imageBeforeClassName="w-[100px] h-[100px]" />
                                        }
                                        placeholderImageText={
                                            <ImageUploader.PlaceholderImageText baseClassName="text-[16px] flex gap-1" />
                                        }
                                    />
                                </ImageUploader>

                                <div className="flex flex-col gap-3">
                                    <div
                                        className={
                                            "flex gap-2 " +
                                            (type === "Update"
                                                ? "justify-center"
                                                : "")
                                        }
                                    >
                                        <ProductNameInput />
                                        {type !== "Update" && (
                                            <ProductCategorySelector />
                                        )}
                                    </div>
                                    <ProductDescriptionInput />
                                </div>
                                <div className="flex items-center gap-3">
                                    <ProductPrice />
                                    <ProductCheck />
                                    <ProductStatusSelector />
                                </div>
                            </div>
                            <ProductPriceSectionRender type={type} shouldRenderDivider={true}/>
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
                            <ProductModalUpdateProductButton
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

export default forwardRef(ProductModal);

function ProductModalUpdateProductButton({
    processedImage,
    setIsLoading,
}: TUpdateProductButtonProps) {
    const { updated_fields } = useAppSelector((state) => state.product);
    const [isTrue, setIsTrue] = useState(false);
    const shouldRender = useMemo(() => {
        if (isTrue) return true;
        for (let key in updated_fields) {
            if (updated_fields[key as keyof TProductUpdatedFields]) {
                setIsTrue(true);
                return true;
            }
        }
        return false;
    }, [updated_fields]);

    return shouldRender ? (
        <UpdateProductButton
            setIsLoading={setIsLoading}
            processedImage={processedImage}
        />
    ) : (
        <></>
    );
}
function ProductModalSectionRenderer({ type }: { type: "Create" | "Update" }) {
    const sections = useAppSelector(
        (state) => state.product.product_price_section_attribute,
    );
    const haveSections = useMemo(() => {
        return Object.keys(sections).length > 0;
    }, [sections]);
    console.log("have sections:", haveSections);
    return haveSections ? (
        <>
            <Divider orientation="vertical" />
            <ProductPriceSectionRender type={type} />
        </>
    ) : (
        <>
            <Divider orientation="vertical" />
            <ProductPriceSectionRender type={type} />
        </>
    );
}
