import { useEffect, useState, useRef, FormEvent } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Textarea,
} from "@nextui-org/react";

import ImageUploader from "@/components/ImageUploader";
import SelectCategory from "@/components/SelectCategory";
import InputMapper, { InputMapperRefType } from "../components/InputMapper";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { useCategoryAttributes } from "@/modules/category/hooks";
import { useAppDispatch } from "@/hooks/state";
import { manageProduct, setProductAttributes } from "@/store/features/productSlice";
import { useCreateProduct } from "../hooks/useCreateProduct";
interface Props {}

function CreateProduct({}: Props) {
    const [productName, setProductName] = useState("");
    const [formState,setFormState] = useState()
    const [category, setCategory] = useState("");
    const { data } = useCategoryAttributes(category);
    const priceRef = useRef<InputMapperRefType>(null);
    const dispatch = useAppDispatch();
    const [showError, setShowError] = useState(false);
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        file: "",
        url: "",
    });
    const { mutate, isPending } = useCreateProduct();

    function handleCreateProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (priceRef.current) {
            const prices = priceRef.current?.price.current;
            for (let i = 0; i < prices.length; i++) {
                for (let j = 0; j < prices[i].attributes.length; j++) {
                    const currentNode = prices[i].attributes[j];
                    if (!currentNode.value) {
                            console.log('if block')
                        prices[i].attributes[j].error = true;
                        setShowError(true);
                        return;
                    } else if (currentNode.value) {
                    }
                }
            }
        }

        const form = new FormData();
        form.append("name", productName);
        // form.append('category',first)
        // mutate(form);
    }

    useEffect(() => {
        if (data) {
            dispatch(manageProduct({ product_name: "hello world" }));
            dispatch(setProductAttributes(data))
        }
    }, [data]);
    return (
        <Card shadow="sm" radius="sm">
            <CardHeader>Create Product</CardHeader>
            <CardBody className="gap-5">
                <form onSubmit={handleCreateProduct}>
                    <div className="flex gap-2 flex-col lg:flex-row lg:gap-3 mb-2">
                        <div className="flex flex-col justify-between gap-2 lg:w-[320px]">
                            <Input
                                label="Product name"
                                size="sm"
                                className="max-w-xs"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <SelectCategory
                                size="sm"
                                selectedKeys={setCategory}
                                className="max-w-[320px]"
                            />
                        </div>
                        <Textarea
                            placeholder="Enter your description"
                            size="lg"
                            minRows={4}
                            classNames={{
                                base: "max-w-xs h-full",
                                label: "hidden",
                            }}
                        />
                    </div>
                    <div
                        className={`flex flex-wrap items-center ${
                            data && "justify-between gap-3"
                        }`}
                    >
                        {data && (
                            <InputMapper
                                data={data}
                                ref={priceRef}
                                showError={showError}
                                setShowError={setShowError}
                            />
                        )}
                        <ImageUploader
                            type="product"
                            processedImage={processedImage}
                            setProcessedImage={setProcessedImage}
                            aspectRatio={{ width: 2, height: 2 }}
                        />
                    </div>
                    <Button
                        className="w-[100px] bg-primaryOrange text-white my-2"
                        isLoading={isPending}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
                {/* <DevTool control={control} /> */}
            </CardBody>
        </Card>
    );
}

export default CreateProduct;
