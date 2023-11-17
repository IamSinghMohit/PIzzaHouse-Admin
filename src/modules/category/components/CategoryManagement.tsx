import { ProcessedImageType } from "@/schema/ImageUploader";
import CategoryAttribute from "./CategoryAttribute";
import ImageUploader from "@/components/ImageUploader";
import { useAppSelector } from "@/hooks/state";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import RenderAttribute from "./RenderAttribute";
import { SubAttribute } from "@/schema/categorySlice";

import {
    Button,
    Card,
    CardBody,
    Input,
    CardHeader,
    Spinner,
} from "@nextui-org/react";

interface Props {
    tableLoading?: boolean;
    submitLoading: boolean;
    defaultImage?: string;
    processedImage: ProcessedImageType;
    inputValue: string;
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
    setProcessedImage: Dispatch<SetStateAction<ProcessedImageType>>;
    onSubmit: () => void;
    attributes: SubAttribute[];
    setAttributes: Dispatch<SetStateAction<SubAttribute[]>>;
}

function CategoryManagement({
    tableLoading,
    submitLoading,
    defaultImage,
    inputValue,
    onChangeInput,
    processedImage,
    setProcessedImage,
    onSubmit,
    attributes,
    setAttributes,
}: Props) {
    const { category_attr_array } = useAppSelector((state) => state.category);
    return (
        <Card
            classNames={{
                body: "flex flex-col gap-3 lg:flex-row lg:justify-between xl:justify-normal xl:gap-[250px]",
            }}
            className={`min-h-[200px] ${
                tableLoading && "flex items-center justify-center"
            }`}
        >
            {tableLoading ? (
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
                                    defaultImage={defaultImage}
                                    type="category"
                                    processedImage={processedImage}
                                    setProcessedImage={setProcessedImage}
                                />
                                <Input
                                    size="sm"
                                    radius="sm"
                                    placeholder="Category name"
                                    value={inputValue}
                                    onChange={onChangeInput}
                                    classNames={{
                                        base: "w-[200px]",
                                    }}
                                />
                            </div>
                            <CategoryAttribute
                                attributes={attributes}
                                setAttributes={setAttributes}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                {category_attr_array.map(
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
                                onPress={onSubmit}
                                className="w-[100px] bg-primaryOrange text-white self-end mt-auto"
                                isLoading={submitLoading}
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

export default CategoryManagement;
