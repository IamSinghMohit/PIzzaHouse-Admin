import ImageUploader from "@/components/ImageUploader";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import {
    ProductCheck,
    ProductPrice,
    ProductStatusSelector,
    ProductNameInput,
    ProductDescriptionInput,
} from "../components/ProductForm";
import { useMemo, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate } from "react-router-dom";
import ProductPriceSectionRender from "../components/ProductPriceSectionRender";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import UpdateProductButton from "../components/button/UpdateProductButton";
import { setProductUpdatedFields } from "@/store/slices/product";

type Props = {};

function ViewProductPage({}: Props) {
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });
    const dispatch = useAppDispatch();
    const shouldRedirectBack = useMediaQuery({ query: "(min-width:800px)" });
    const defaultImage = useAppSelector(
        (state) => state.product.product_management.product_image,
    );
    if (shouldRedirectBack) {
        <Navigate to="/products" />;
    }
    if (!defaultImage) {
        return <Navigate to="/products" />;
    }

    useEffect(() => {
        if (processedImage.file) {
            dispatch(
                setProductUpdatedFields({ type: "product_image", value: true }),
            );
        }
    }, [processedImage.file]);

    return (
        <Card radius="sm">
            <CardHeader>View Product</CardHeader>
            <CardBody className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 items-center">
                    <ImageUploader
                        aspectRatio={{ x: 4, y: 3 }}
                        processedImage={processedImage}
                        setProcessedImage={setProcessedImage}
                        defaultImage={defaultImage}
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
                    <ProductNameInput />
                </div>
                <div className="flex flex-wrap justify-between max-w-[700px]">
                    <div className="flex gap-3 flex-wrap">
                        <div className="w-[280px]">
                            <ProductDescriptionInput />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-start mt-2">
                        <ProductPrice />
                        <div className="flex items-center">
                            <ProductCheck />
                            <ProductStatusSelector />
                        </div>
                    </div>
                </div>
                <ProductPriceSectionRender type="Update" />
                <CardFooter className="flex justify-end">
                    <ViewProductPageUpdateButton
                        processedImage={processedImage}
                    />{" "}
                </CardFooter>
            </CardBody>
        </Card>
    );
}

export default ViewProductPage;

function ViewProductPageUpdateButton({
    processedImage,
    setIsLoading,
}: TUpdateProductButtonProps) {
    const { updated_fields } = useAppSelector((state) => state.product);
    const shouldRender = useMemo(() => {
        for (let key in updated_fields) {
            if (updated_fields[key]) {
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
