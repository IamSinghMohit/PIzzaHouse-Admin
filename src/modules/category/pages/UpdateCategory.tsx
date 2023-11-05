import {
    Button,
    Card,
    CardBody,
    Input,
    CardHeader,
    Spinner,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import RenderAttribute from "../components/RenderAttribute";
import ImageUploader from "@/components/ImageUploader";
import CategoryAttribute from "../components/CategoryAttribute";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { useState } from "react";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { Navigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
    mutatePriceAttr,
} from "@/store/features/categorySlice";
import { Attribute } from "@/schema/categorySlice";
import useCategoryAttributes from "../hooks/useCategoryAttributes";
import { useEffect } from "react";

function UpdateCategory() {
    const { type } = useParams();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const category = useAppSelector(
        (state) => state.category.currentSelectedCategory
    );
    if (!category && type === "update") {
        return <Navigate to="/category" />;
    }
    const [id, setId] = useState("");
    const { data, isLoading } = useCategoryAttributes(id);
    const categoryAtt = queryClient.getQueryState<Attribute[]>([
        "category",
        "attribute",
        category && category.id,
    ]);

    const { categoryArray } = useAppSelector((state) => state.category);
    const [name, setName] = useState(category?.name || "");
    const { mutate, isPending } = useCreateCategory();
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });
    function handleSubmit() {
        const form = new FormData();
        form.append("image", processedImage.file as Blob);
        form.append("name", name);
        form.append("priceAttributes_json", JSON.stringify(categoryArray));
        form.append("updatedFields_json", JSON.stringify(categoryArray));
        // mutate(form);
    }

    useEffect(() => {
        if (type === "update" && categoryAtt?.data) {
            dispatch(mutatePriceAttr(categoryAtt?.data));
        } else if (type === "update") {
            setId(category?.id || "");
        }
    }, []);

    useEffect(() => {
        if (data) {
            dispatch(mutatePriceAttr(data));
        }
    }, [data]);

    return (
        <Card
            classNames={{
                body: "flex flex-col gap-3 lg:flex-row lg:justify-between xl:justify-normal xl:gap-[250px]",
            }}
            className={`min-h-[200px] ${
                isLoading && "flex items-center justify-center"
            }`}
        >
            {isLoading ? (
                <Spinner size="lg" />
            ) : (
                <>
                    <CardHeader className="pb-0 text-primaryOrange">
                        Create Category
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <ImageUploader
                                    defaultImage={category?.image}
                                    type="category"
                                    processedImage={processedImage}
                                    setProcessedImage={setProcessedImage}
                                />
                                <Input
                                    size="lg"
                                    radius="sm"
                                    placeholder="Category name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    classNames={{
                                        base: "w-[200px]",
                                        input: "uppercase",
                                    }}
                                />
                            </div>
                            <CategoryAttribute />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                {categoryArray.map(
                                    ({ attribute_title, id, attributes }) => (
                                        <RenderAttribute
                                            attribute_title={attribute_title}
                                            key={id}
                                            id={id}
                                            attributes={attributes}
                                        />
                                    )
                                )}
                            </div>
                            <Button
                                onPress={handleSubmit}
                                className="w-[100px] bg-primaryOrange text-white self-end mt-auto"
                                isLoading={isPending}
                            >
                                Submit
                            </Button>
                        </div>
                    </CardBody>
                </>
            )}
        </Card>
    );
}
export default UpdateCategory
