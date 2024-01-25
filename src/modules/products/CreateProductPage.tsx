import ImageUploader from "@/components/ImageUploader";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import {
    ProductCheck,
    ProductPrice,
    ProductStatusSelector,
    ProductNameInput,
    ProductCategorySelector,
    ProductDescriptionInput,
} from "./components/ProductForm";
import { useState } from "react";
import CreateProductButton from "./components/button/CreateProductButton";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import ProductPriceSectionRender from "./components/ProductPriceSectionRender";
import { TProcessedImage } from "@/types/ImageUploader";

type Props = {};

function CreateProductPage({}: Props) {
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });
    const [loading, setIsLoading] = useState(false);
    const shouldRedirectBack = useMediaQuery({ query: "(min-width:800px)" });
    const navigate = useNavigate();
    if (shouldRedirectBack) {
        navigate("products");
    }

    return (
        <Card radius="sm">
            <CardHeader>Create Product</CardHeader>
            <CardBody className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 items-center">
                    <ImageUploader
                        aspectRatio={{ x: 4, y: 3 }}
                        processedImage={processedImage}
                        setProcessedImage={setProcessedImage}
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
                <div className="max-w-[320px] sm:max-w-full mx-auto">
                    <div className="flex gap-3 flex-wrap">
                        <div className="w-[280px]">
                            <ProductDescriptionInput />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <ProductCategorySelector />
                            <ProductPrice />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ProductCheck />
                        <ProductStatusSelector />
                    </div>
                </div>
                <ProductPriceSectionRender type="Create" />
                <CardFooter className="flex justify-end">
                    <CreateProductButton
                        setIsLoading={setIsLoading}
                        processedImage={processedImage}
                    />
                </CardFooter>
            </CardBody>
        </Card>
    );
}

export default CreateProductPage;
