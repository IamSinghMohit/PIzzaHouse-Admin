import { Ref, useImperativeHandle ,forwardRef} from "react";
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { TModalRef } from "@/types/Modal";

interface Props {
    onYesPress: () => void;
    content: React.ReactNode;
}

function DeleteAlert(
    { onYesPress,  content }: Props,
    ref: Ref<TModalRef>
) {
    const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();

    useImperativeHandle(
        ref,
        () => ({
                onOpen,
                isOpen,
                onClose,
        }),
        []
    );
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>{content}</ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                        onClose();
                                    }}
                                >
                                    No
                                </Button>
                                <Button
                                    color="primary"
                                    className="text-white"
                                    onPress={() => {
                                        onYesPress();
                                        onClose();
                                    }}
                                >
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default forwardRef(DeleteAlert)
