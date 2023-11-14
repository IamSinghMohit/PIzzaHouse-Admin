import { Button, Card, CardBody, Input, CardHeader } from "@nextui-org/react";
import { useAppSelector } from "@/hooks/state";
import RenderAttribute from "../components/RenderAttribute";
import ImageUploader from "@/components/ImageUploader";
import CategoryAttribute from "../components/CategoryAttribute";
import { useEffect,  useState } from "react";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { useCreateCategory } from "../hooks";
import { FormDataUpdate } from "@/utils";
import { useNavigate } from "react-router-dom";
import { errorToast} from "@/lib/toast";
import { SubAttribute } from "@/schema/categorySlice";

function CreateCategory() {
    const { category_attr_array } = useAppSelector((state) => state.category);
    const [attributes, setAttributes] = useState<SubAttribute[]>([]);
    const [name, setName] = useState("");
    const { mutate, isPending ,isSuccess} = useCreateCategory();
    const navigate = useNavigate()
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });

    function handleCreate() {
        if (!processedImage.file) {
            return errorToast("image is required");
        }else if(!name){
            return errorToast("name is required");
        }else if(attributes.length > 0){
            return errorToast("please save you attributes");
        }
        FormDataUpdate(
            {
                image: processedImage.file,
                name: name,
                json: JSON.stringify(category_attr_array),
            },
            mutate
        );
    }

    useEffect(() => {
        if(isSuccess){
            // navigate('/category')
        } 
    },[isSuccess])
    return (
        <Card
            classNames={{
                body: "flex flex-col gap-3 lg:flex-row lg:justify-between xl:justify-normal xl:gap-[250px]",
            }}
            className={`min-h-[200px]`}
        >
            <CardHeader className="pb-0 text-primaryOrange">
                Create Category
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <ImageUploader
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
                            }}
                            classNames={{
                                base: "w-[200px]",
                            }}
                        />
                    </div>
                    <CategoryAttribute attributes={attributes} setAttributes={setAttributes}/>
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
                        onPress={handleCreate}
                        className="w-[100px] bg-primaryOrange text-white self-end mt-auto"
                        isLoading={isPending}
                    >
                        Create
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
export default CreateCategory;