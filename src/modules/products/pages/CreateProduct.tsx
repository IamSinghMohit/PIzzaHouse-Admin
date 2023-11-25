import { useEffect, useState, FormEvent, useCallback } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Textarea,
    Switch,
} from "@nextui-org/react";
import ImageUploader from "@/components/ImageUploader";
import SelectCategory from "@/components/SelectCategory";
import InputMapper from "../components/InputMapper";
import { ProcessedImageType } from "@/types/ImageUploader";
import { useCategoryAttributes } from "@/modules/category/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    setProductAttributeState,
    setProductAttributes,
    setProductState,
} from "@/store/features/productSlice";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { FormDataSend } from "@/utils";
import { errorToast } from "@/lib/toast";
import AppCheck from "@/modules/shared/AppCheck";
interface Props {}

function CreateProduct({}: Props) {
    const [category, setCategory] = useState("");
    const { data } = useCategoryAttributes(category.split(":")[1] || "");
    const dispatch = useAppDispatch();
    const { product_attributes, product_management ,default_prices} = useAppSelector(
        (state) => state.product
    );
    const [showError, setShowError] = useState(false);
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        file: "",
        url: "",
    });
    const { mutate, isPending } = useCreateProduct();

    const handleCreateProduct = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const attributes = [];

            for (let i = 0; i < product_attributes.length; i++) {
                for (
                    let j = 0;
                    j < product_attributes[i].attributes.length;
                    j++
                ) {
                    const currentNode = product_attributes[i].attributes[j];
                    const attArr = product_attributes[i].attributes.map((a) => {
                        return {
                            title: a.title,
                            value: a.value,
                        };
                    });
                    attributes[i] = {
                        attribute_title: product_attributes[i].attribute_title,
                        attributes: attArr,
                    };
                    if (!currentNode.value) {
                        dispatch(
                            setProductAttributeState({
                                blockId: product_attributes[i].id,
                                attId: product_attributes[i].attributes[j].id,
                                data: {
                                    error: true,
                                },
                            })
                        );
                        setShowError(true);
                        return;
                    }
                }
            }

            if (!processedImage.file) return errorToast("image is required");
            const { product_name, product_description } = product_management;
            if (!product_name || !product_description) {
                return setShowError(true);
            }
            FormDataSend(
                {
                    name: product_management.product_name,
                    category:category.split(':')[0],
                    description: product_management.product_description,
                    status: product_management.product_status,
                    price_attributes_json: JSON.stringify(attributes),
                    image: processedImage.file,
                    price:product_management.product_price,
                    featured:product_management.product_featured,
                    default_prices_json:JSON.stringify(default_prices),
                },
                mutate
            );
        },
        [product_attributes, product_management, processedImage]
    );

    useEffect(() => {
        if (data) {
            dispatch(setProductAttributes(data));
        }
}, [data]);

    return (
        <Card shadow="sm" radius="sm">
            <CardHeader>Create Product</CardHeader>
            <CardBody className="">
                <form onSubmit={handleCreateProduct}>
                    <div
                    // className={`flex flex-wrap items-end ${
                    //     product_attributes && "justify-between gap-5"
                    // }`}
                    >

                        <div className="flex gap-2 mb-4 flex-wrap">
                            <div className="flex flex-col justify-between gap-2">
                                <Input
                                    label="Product name"
                                    size="sm"
                                    className="max-w-xs"
                                    value={product_management.product_name}
                                    onChange={(e) =>
                                        dispatch(
                                            setProductState({
                                                product_name: e.target.value,
                                            })
                                        )
                                    }
                                    isInvalid={
                                        showError &&
                                        !product_management.product_name
                                    }
                                />
                            </div>
                            <Textarea
                                placeholder="Enter your description"
                                size="lg"
                                value={product_management.product_description}
                                onChange={(e) =>
                                    dispatch(
                                        setProductState({
                                            product_description: e.target.value,
                                        })
                                    )
                                }
                                maxLength={120}
                                minRows={4}
                                isInvalid={
                                    showError &&
                                    !product_management.product_description
                                }
                                classNames={{
                                    base: "max-w-xs h-full",
                                    label: "hidden",
                                }}
                            />
                        </div>
                        <SelectCategory
                                size="sm"
                                className="max-w-xs"
                                selectedKeys={setCategory}

                        />
                        <ImageUploader
                            type="product"
                            processedImage={processedImage}
                            setProcessedImage={setProcessedImage}
                            aspectRatio={{ width: 2, height: 2 }}
                        />
                        <InputMapper
                            showError={showError}
                            setShowError={setShowError}
                        />
                    </div>
                    <div className="flex gap-2 my-3 flex-wrap text-[14px]">
                        <Switch
                            className="font-bold"
                            onValueChange={(value) =>
                                dispatch(
                                    setProductState({
                                        product_status: value
                                            ? "Published"
                                            : "Draft",
                                    })
                                )
                            }
                            isSelected={
                                "Published" == product_management.product_status
                            }
                        >
                            <span className="text-[14px]">Publish</span>
                        </Switch>
                        <AppCheck
                            text="Featured"
                            onValueChange={(e) =>
                                dispatch(
                                    setProductState({ product_featured: e })
                                )
                            }
                        />
                    </div>
                    <Button
                        className="w-[100px] bg-primaryOrange text-white"
                        isLoading={isPending}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}

export default CreateProduct;
