import ImageUploader from "@/components/ImageUploader";
import SelectCategory from "@/components/SelectCategory";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import PriceInput from "@/modules/shared/PriceInput";
import { setTopingName, setTopingPrice } from "@/store/features/topingSlice";
import { ProcessedImageType } from "@/types/ImageUploader";
import { FormDataSend } from "@/utils";
import { Card, CardHeader, Button, CardBody, Input } from "@nextui-org/react";

import React, { useState } from "react";
import { useCreateToping } from "../hooks/useCreateToping";
interface Props {}

function CreateToping({}: Props) {
    const [category, setCategory] = useState("");
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        file: "",
        url: "",
    });
    const name = useAppSelector((state) => state.toping.name);
    const price = useAppSelector((state) => state.toping.price);
    const { mutate, isPending } = useCreateToping();
    const dispatch = useAppDispatch();

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setTopingName(e.target.value));
    }

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setTopingPrice(e.target.value));
    }
    function handleSubmit() {
        FormDataSend(
            {
                name,
                price,
                category: category.split(":")[0],
                image: processedImage.file,
            },
            mutate
        );
    }
    return (
        <Card
            classNames={{
                body: "flex flex-col gap-3 justify-center items-center",
            }}
        >
            <CardHeader className="pb-0 text-primaryOrange">
                Create Toping
            </CardHeader>
            <CardBody>
                <div className="flex flex-col items-center gap-2">
                    <ImageUploader
                        // defaultImage={defaultImage}
                        type="category"
                        processedImage={processedImage}
                        setProcessedImage={setProcessedImage}
                    />
                    <Input
                        size="sm"
                        radius="sm"
                        placeholder="Category name"
                        value={name}
                        onChange={handleNameChange}
                        classNames={{
                            base: "w-[200px]",
                        }}
                    />
                    <SelectCategory
                        size="sm"
                        className="max-w-xs"
                        selectedKeys={setCategory}
                    />
                    <div className="flex flex-col gap-1 mt-4 font-bold">
                        <span>Default(Original price)</span>
                        <PriceInput
                            title="Price"
                            className="border-primaryOrange border-3 rounded-lg"
                            chipClass="bg-red-500  border-red-700"
                            onChange={handlePriceChange}
                            value={price.toString()}
                        />
                    </div>
                </div>
                <Button
                    onPress={handleSubmit}
                    className="w-[100px] bg-primaryOrange text-white mt-auto"
                    isLoading={isPending}
                >
                    Submit
                </Button>
            </CardBody>
        </Card>
    );
}

export default CreateToping;
