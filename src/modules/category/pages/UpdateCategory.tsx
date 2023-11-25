import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { useQueryClient } from "@tanstack/react-query";
import { SubAttribute } from "@/schema/categorySlice";
import {
    setPriceAttribute,
    setUpdatedFields,
} from "@/store/features/categorySlice";
import { Attribute } from "@/schema/categorySlice";
import { useEffect, useCallback, useState, ChangeEvent } from "react";
import { useCategoryAttributes, useUpdateCategory } from "../hooks";
import { FormDataSend } from "@/utils";
import { errorToast } from "@/lib/toast";
import CategoryManagement from "../components/CategoryManagement";

function UpdateCategory() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const [id, setId] = useState(""); // this state will be used to fetch attributes if they not exists in query cache
    // checking the attributes in redux state if it exists or not if category ever have been viewed
    const [attributes, setAttributes] = useState<SubAttribute[]>([]);
    const category = useAppSelector(
        (state) => state.category.current_selected_category
    );
    const categoryAtt = queryClient.getQueryState<Attribute[]>([
        "category",
        "attribute",
        category && category.id,
    ])?.data;
    // we will fetch the attributes if they are not exists in redux state
    const { data, isLoading, isError } = useCategoryAttributes(id);
    const { mutate, isPending } = useUpdateCategory();

    const [name, setName] = useState(category?.name || "");
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });

    const { category_attr_array, updated_fields } = useAppSelector(
        (state) => state.category
    );

    const handleUpdate = () => {
        if (category) {
            console.log(updated_fields,category_attr_array)
            if(attributes.length > 0){
                return errorToast('please save attributes')
            }
            FormDataSend(
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

    const  handleOnChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) =>  {
        setName(e.target.value);
        if (!updated_fields.name) {
            dispatch(setUpdatedFields("name"));
        }
    },[name])

    useEffect(() => {
        // fetching attributes if they are not exists in query cache be changing id state
        if (categoryAtt) {
            dispatch(setPriceAttribute({ data: categoryAtt, type: "REPLACE" }));
        } else {
            setId(category?.id || "");
        }
    }, []);

    useEffect(() => {
        if (data) {
            dispatch(setPriceAttribute({ data, type: "REPLACE" }));
        }
        if (isError) {
            errorToast("error while fetching attributes");
        }
    }, [data, isError]);

    return (
        <CategoryManagement
            tableLoading={isLoading}
            submitLoading={isPending}
            processedImage={processedImage}
            setProcessedImage={setProcessedImage}
            inputValue={name}
            onChangeInput={handleOnChangeInput}
            onSubmit={handleUpdate}
            attributes={attributes}
            defaultImage={category?.image}
            setAttributes={setAttributes}
        />
    );
}
export default UpdateCategory;
