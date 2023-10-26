import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Textarea,
} from "@nextui-org/react";

import { DevTool } from "@hookform/devtools";
import ImageUploader from "@/components/ImageUploader";
import SelectCategory from "@/components/SelectCategory";
import InputMapper from "../components/InputMapper";
import ProductContextProvider, { useProductContext } from "../context";
import { useQueryClient } from "@tanstack/react-query";
import { AttributeSchemaType } from "@/modules/category/schema";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
interface Props {}

function CreateProductComponent({}: Props) {
    const [productName, setProductName] = useState("");
    const { processedImage, setProcessedImage, category, setCategory } =
        useProductContext();
    const queryClient = useQueryClient();
    const categoriesAttr = queryClient.getQueryState<AttributeSchemaType>([
        "category",
        "attribute",
        category,
    ]);
    const zodSchema = (formdata:Record<string,string>) => {
        const schema:Record<string,any> = {}
        for(const key in formdata){
            schema[key] = z.number()
        }
        return z.object(schema)
    }
    const { register, control ,handleSubmit,formState} = useForm({
        // resolver:zodResolver(zodSchema(formState))
    });

    function handleCreateProduct() {
        const form = new FormData();
        form.append("name", productName);
        // form.append('category',first)
    }

    console.log(categoriesAttr );
    return (
        <Card shadow="sm" radius="sm">
            <CardHeader>Create Product</CardHeader>
            <CardBody className="gap-5">
                <form onSubmit={handleSubmit(() => {console.log(formState);})}>
                    <div className="flex gap-2 flex-col lg:flex-row lg:gap-3">
                        <div className="flex flex-col gap-2 lg:w-[320px]">
                            <Input
                                label="Product name"
                                size="sm"
                                className="max-w-xs"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <SelectCategory
                                size="sm"
                                value={category}
                                setValue={setCategory}
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
                            categoriesAttr && "justify-between gap-3"
                        }`}
                    >
                        {categoriesAttr?.data && (
                            <InputMapper
                                data={categoriesAttr.data}
                                register={register}
                                formState={formState}
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
                        onPress={handleCreateProduct}
                        className="w-[100px] bg-primaryOrange text-white"
                        // isLoading={isPending}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
                <DevTool control={control} />
            </CardBody>
        </Card>
    );
}

function CreateProduct() {
    return (
        <ProductContextProvider>
            <CreateProductComponent />
        </ProductContextProvider>
    );
}

export default CreateProduct;
