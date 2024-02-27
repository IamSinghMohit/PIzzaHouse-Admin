import ImageUploader from "@/components/ImageUploader";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import {
    ProductCheck,
    ProductPrice,
    ProductStatusSelector,
    ProductNameInput,
    ProductDescriptionInput,
} from "../components/ProductForm";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate } from "react-router-dom";
import ProductPriceSectionRender from "../components/ProductPriceSectionRender";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    setProductState,
    setProductUpdatedFields,
} from "@/store/slices/product";
import ToggledUpdateProductButton from "../components/button/ToggledProductUpdateButton";

type Props = {};

function ViewProductPage({}: Props) {
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });
    const dispatch = useAppDispatch();
    const shouldRedirectBack = useMediaQuery({ query: "(min-width:800px)" });
    const defaultImage = useAppSelector(
        (state) => state.product.product_management.product_image
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
                setProductUpdatedFields({ type: "product_image", value: true })
            );
        }
    }, [processedImage.file]);

    useEffect(() => {
        return () => {
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
                })
            );
        };
    }, []);

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

                <ProductDescriptionInput />
                <div className="create-product-page-grid">
                    <ProductPrice />
                    <div className="flex items-center gap-2">
                        <ProductCheck />
                        <ProductStatusSelector />
                    </div>
                </div>

                <ProductPriceSectionRender
                    type="Update"
                    shouldRenderDivider={false}
                />
                <CardFooter className="flex justify-end">
                    <ToggledUpdateProductButton
                        processedImage={processedImage}
                    />{" "}
                </CardFooter>
            </CardBody>
        </Card>
    );
}

export default ViewProductPage;
