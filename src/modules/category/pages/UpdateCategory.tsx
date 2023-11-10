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
import { useState } from "react";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { useQueryClient } from "@tanstack/react-query";
import {
    setPriceAttribute,
    setUpdatedFields,
} from "@/store/features/categorySlice";
import { Attribute } from "@/schema/categorySlice";
import { useEffect } from "react";
import { useCategoryAttributes, useUpdateCategory } from "../hooks";
import { FormDataUpdate } from "@/utils";
import { errorToast } from "@/lib/toast";

function UpdateCategory() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const [id, setId] = useState(""); // this state will be used to fetch attributes if they not exists in query cache
    // checking the attributes in redux state if it exists or not if category ever have been viewed
    const category = useAppSelector(
        (state) => state.category.current_selected_category
    );
    const categoryAtt = queryClient.getQueryState<Attribute[]>([
        "category",
        "attribute",
        category && category.id,
    ]);
    // we will fetch the attributes if they are not exists in redux state
    const { data, isLoading ,isError} = useCategoryAttributes(id);
    const { mutate, isPending } = useUpdateCategory();

    const [name, setName] = useState(category?.name || "");
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });

    const { category_attr_array, updated_fields } = useAppSelector(
        (state) => state.category
    );


    function handleUpdate() {
        if (category) {
            FormDataUpdate(
                {
                    id: category.id,
                    is_name_update: `${updated_fields.name}`,
                    is_image_update: `${updated_fields.image}`,
                    is_price_attributes_update: `${updated_fields.price_attributes}`,
                    name: name,
                    image: processedImage.file,
                    json: JSON.stringify(category_attr_array),
                },
                mutate
            );
        }
    }

    useEffect(() => {
        // fetching attributes if they are not exists in query cache be changing id state
        if (categoryAtt?.data) {
            dispatch(setPriceAttribute((_) => categoryAtt?.data));
        } else {
            setId(category?.id || "");
        }
    }, []);

    useEffect(() => {
        if (data) {
            dispatch(setPriceAttribute(data));
        }
        if(isError){
            errorToast('error while fetching attributes')
        }
    }, [data,isError]);

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
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (!updated_fields.name) {
                                            dispatch(setUpdatedFields("name"));
                                        }
                                    }}
                                    classNames={{
                                        base: "w-[200px]",
                                    }}
                                />
                            </div>
                            <CategoryAttribute />
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
                                onPress={handleUpdate}
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
export default UpdateCategory;
