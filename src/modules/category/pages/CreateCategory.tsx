import { useAppSelector } from "@/hooks/state";
import { useEffect, useState } from "react";
import { ProcessedImageType } from "@/types/ImageUploader";
import { useCreateCategory } from "../hooks";
import { FormDataSend } from "@/utils";
import { useNavigate } from "react-router-dom";
import { errorToast } from "@/lib/toast";
import { CategorySubAttributeType } from "@/types/slice/Category";
import CategoryManagement from "../components/CategoryManagement";

function CreateCategory() {
    const { category_attr_array } = useAppSelector((state) => state.category);
    const [attributes, setAttributes] = useState<CategorySubAttributeType []>([]);
    const [name, setName] = useState("");
    const { mutate, isPending, isSuccess } = useCreateCategory();
    const navigate = useNavigate();
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });

    function handleCreate() {
        if (!processedImage.file) {
            return errorToast("image is required");
        } else if (!name) {
            return errorToast("name is required");
        } else if (attributes.length > 0) {
            return errorToast("please save you attributes");
        }
        FormDataSend(
            {
                image: processedImage.file,
                name: name,
                json: JSON.stringify(category_attr_array),
            },
            mutate
        );
    }

    useEffect(() => {
        if (isSuccess) {
            // navigate('/category')
        }
    }, [isSuccess]);
    return (
        <CategoryManagement
            attributes={attributes}
            setAttributes={setAttributes}
            setProcessedImage={setProcessedImage}
            inputValue={name}
            onChangeInput={(e) => setName(e.target.value)}
            onSubmit={handleCreate}
            processedImage={processedImage}
            submitLoading={isPending}
        />
    );
}
export default CreateCategory;