import ImageUploader from "@/components/ImageUploader";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import {
    TopingCategorySelector,
    TopingNameInput,
    TopingPrice,
    TopingStatusSelector,
} from "../components/TopingForm";
import TopingCategoryRenderer from "../components/TopingCategoryRenderer";
import {  useEffect,useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { TProcessedImage } from "@/types/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import CreateTopingButton from "../components/button/CreateTopingButton";
import {
    setTopingCategories,
    setTopingState,
    setTopingUpdatedFields,
} from "@/store/slices/topings";
import { StatusEnum } from "@/modules/types/inex";
import ToggledUpdateTopingButton from "../components/button/ToggledUpdateTopingButton";

type Props = {};

function TopingPage({}: Props) {
    const { id } = useParams();
    const isCreatePage = id?.startsWith("create");

    const shouldRedirectBack = useMediaQuery({
        query: "(min-width:710px)",
    });
    const dispatch = useAppDispatch();
    const defaultImage = useAppSelector(
        (state) => state.toping.toping_management.image,
    );
    const [processedImage, setProcessedImage] = useState<TProcessedImage>({
        url: "",
        file: null,
    });
    const navigate = useNavigate();

    if (shouldRedirectBack) {
        navigate("topings");
    }

    useEffect(() => {
        return () => {
            dispatch(
                setTopingState({
                    type: "SET",
                    data: {
                        id: "",
                        image: "",
                        name: "",
                        status: StatusEnum.DRAFT,
                        price: 0,
                    },
                }),
            );
            dispatch(setTopingCategories({}));
            dispatch(setTopingUpdatedFields({ type: "ALL", value: false }));
        };
    }, []); 

    return (
        <Card>
            <CardBody className="space-y-2">
                <ImageUploader
                    aspectRatio={{ x: 2, y: 2 }}
                    processedImage={processedImage}
                    setProcessedImage={setProcessedImage}
                    defaultImage={isCreatePage ? undefined : defaultImage}
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
            <CardFooter className="flex justify-end">
                {isCreatePage ? (
                    <CreateTopingButton processedImage={processedImage} />
                ) : (
                    <ToggledUpdateTopingButton
                        processedImage={processedImage}
                    />
                )}
            </CardFooter>
        </Card>
    );
}

export default TopingPage;
