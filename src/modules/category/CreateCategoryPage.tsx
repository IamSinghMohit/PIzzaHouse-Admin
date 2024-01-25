import ImageUploader from "@/components/ImageUploader";
import { TProcessedImage } from "@/types/ImageUploader";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import { CategoryInput } from "./CategoryForm";
import CategoryPriceSection from "./components/CategoryPriceSection";
import CreateCategoryButton from "./components/buttons/CreateCategoryButton";
import { Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

type Props = {};

function CreateCategoryPage({}: Props) {
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const shouldRener = useMediaQuery({ query: "(max-width:750px)" });
    if(!shouldRener){
        return <Navigate to={"/category"}/>
    }
    return (
        <Card radius="sm">
            <CardHeader>Create Category</CardHeader>
            <CardBody className="flex flex-col justify-center items-center gap-3">
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

                <CreateCategoryButton
                    setIsLoading={setIsLoading}
                    processedImage={processedImage}
                />
            </CardBody>
        </Card>
    );
}

export default CreateCategoryPage;
