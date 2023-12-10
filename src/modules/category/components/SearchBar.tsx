import ImageUploader from "@/components/ImageUploader";
import { SearchIcon } from "@/icons";
import { ProcessedImageType } from "@/types/ImageUploader";
import {
    Card,
    CardBody,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ModalContent,
    useDisclosure,
    ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";
import { FaPlusMinus } from "react-icons/fa6";

interface Props {}

function SearchBar({}: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState("");
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        file: null,
        url: "",
    });
    return (
        <Card className="mb-2" shadow="sm" radius="sm">
            <CardBody className="flex-row justify-between gap-2 items-center flex-wrap">
                <Input
                    placeholder="Search by name"
                    startContent={<SearchIcon />}
                    radius="sm"
                    className="max-w-[300px] sm:w-[290px]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="sm"
                />
                <Button
                    radius="sm"
                    endContent={<FaPlusMinus />}
                    className="bg-primaryOrange text-white"
                    // onPress={() =>
                    //     dispatch(
                    //         setPriceAttribute({ data: [], type: "REPLACE" })
                    //     )
                    // }
                    onPress={() => onOpen()}
                >
                    Create Category
                </Button>
                <Modal size="5xl" isOpen={isOpen} onClose={onClose} radius="sm">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Create Category
                                </ModalHeader>
                                <ModalBody>
                                    <ImageUploader
                                        aspectRatio={{ x: 2, y: 2 }}
                                        processedImage={processedImage}
                                        setProcessedImage={setProcessedImage}
                                    >
                                        <ImageUploader.PlaceholderContainer
                                            baseClassName="w-[100px] h-[100px]"
                                            placeholderImage={
                                                <ImageUploader.PlaceholderImage imageBeforeClassName="w-[40px] h-[40px]" />
                                            }
                                            placeholderImageText={
                                                <ImageUploader.PlaceholderImageText baseClassName="text-[11px] flex gap-1"/>
                                            }
                                        />
                                    </ImageUploader>
                                    <Input label="Name" radius="sm" size="sm" className="w-[200px]"/>
                                </ModalBody>
                                <ModalFooter className="px-6 py-2">
                                    <Button
                                        radius="sm"
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </CardBody>
        </Card>
    );
}

export default SearchBar;
