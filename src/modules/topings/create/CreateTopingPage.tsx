import ImageUploader from "@/components/ImageUploader";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@nextui-org/react";
import {
    TopingCategorySelector,
    TopingNameInput,
    TopingPrice,
    TopingStatusSelector,
} from "../components/TopingForm";
import TopingCategoryRenderer from "../components/TopingCategoryRenderer";
import { useEffect, useState } from "react";
import CreateTopingButton from "../components/button/CreateTopingButton";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

type Props = {};

function CreateTopingPage({}: Props) {
    const shouldRedirectBack = useMediaQuery({
        query: "(min-width:710px)",
    });
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });
    const navigate = useNavigate();

    if (shouldRedirectBack) {
        navigate("topings");
    }
    console.log(shouldRedirectBack)
    return (
        <Card>
            <CardBody className="space-y-2">
                <ImageUploader
                    aspectRatio={{ x: 2, y: 2 }}
                    processedImage={processedImage}
                    setProcessedImage={setProcessedImage}
                    // defaultImage={
                    //     type == "Update" ? defaultImage : undefined
                    // }
                >
                    <ImageUploader.PlaceholderContainer
                        baseClassName="w-[180px] h-[180px] mx-auto"
                        placeholderImage={
                            <ImageUploader.PlaceholderImage imageBeforeClassName="w-[100px] h-[100px]" />
                        }
                        placeholderImageText={
                            <ImageUploader.PlaceholderImageText baseClassName="text-[16px] flex gap-1" />
                        }
                    />
                </ImageUploader>
                <TopingNameInput />
                <TopingCategoryRenderer className="min-w-[200px]" />
                <TopingCategorySelector className="min-w-full" />
                <TopingStatusSelector />
                <TopingPrice />
            </CardBody>
            <CardFooter className="px-6 py-2">
                <Button radius="sm" color="danger" variant="light">
                    Close
                </Button>
                {/* {type == "Create" ? (
                    <CreateTopingButton
                        setIsLoading={setIsLoading}
                        processedImage={processedImage}
                    />
                ) : (
                    <UpdateTopingButton
                        setIsLoading={setIsLoading}
                        processedImage={processedImage}
                        onSuccess={onClose}
                    />
                )} */}
            </CardFooter>
        </Card>
    );
}

export default CreateTopingPage;
