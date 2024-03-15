import ImageUploader from "@/components/ImageUploader";
import { TProcessedImage } from "@/types/ImageUploader";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CategoryInput } from "../CategoryForm";
import CategoryPriceSection from "../components/CategoryPriceSection";
import CreateCategoryButton from "../components/buttons/CreateCategoryButton";
import { Navigate, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CategoryPriceSectionRenderer from "../components/CategoryPriceSectionRenderer";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    deletePriceSection,
    setCategorySections,
} from "@/store/slices/category";

type Props = {};

function CreateCategoryPage({}: Props) {
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });
    const shouldRener = useMediaQuery({ query: "(max-width:750px)" });
    const navigate = useNavigate();

    if (!shouldRener) {
        return <Navigate to={"/categories"} />;
    }
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(setCategorySections({ type: "REPLACE", data: [] }));
        };
    }, []);
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
                <div className="max-h-[400px] overflow-y-scroll thin-scroll-thumb w-full">
                    <CreateCategoryPagePriceSectionRenderer />
                </div>
                <CreateCategoryButton
                    processedImage={processedImage}
                    className="z-10"
                    onSuccess={() => navigate("/categories")}
                />
            </CardBody>
        </Card>
    );
}

export default CreateCategoryPage;

function CreateCategoryPagePriceSectionRenderer() {
    const dispatch = useAppDispatch();
    const category_price_sec = useAppSelector(
        (state) => state.category.category_price_sec,
    );

    function handleDeleteSection(id: string) {
        dispatch(deletePriceSection(id));
    }
    return (
        <CategoryPriceSectionRenderer
            renderDeleteButton={true}
            priceSections={category_price_sec}
            onDelete={handleDeleteSection}
            className="mb-2 w-full"
        />
    );
}
