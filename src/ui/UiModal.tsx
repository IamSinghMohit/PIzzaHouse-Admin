import React, { forwardRef, Ref, useImperativeHandle } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import { ModalRefType } from "@/schema/modal";

interface Props {
    title?: string;
    footerContent?: React.ReactNode;
    children: React.ReactNode;
    onClose?: () => void;
    size?:'2xl'|'3xl'|'5xl'|'full'
    bodyClassName?:string;
}
function UiModal(
    { title, children, footerContent, onClose ,size,bodyClassName}: Props,
    ref: Ref<ModalRefType>
) {
    const discloser = useDisclosure();

    useImperativeHandle(
        ref,
        () => {
            // return { onOpen, isOpen, onClose };
            return {
                onOpen: discloser.onOpen,
                isOpen: discloser.isOpen,
                onClose: discloser.onClose,
            };
        },
        []
    );

    return (
        <>
            <Modal
                size={size}
                isOpen={discloser.isOpen}
                onOpenChange={discloser.onOpenChange}
                scrollBehavior="inside"
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            {title && (
                                <ModalHeader className="flex flex-col gap-1">
                                    {title}
                                </ModalHeader>
                            )}
                            <ModalBody className={bodyClassName}>{children}</ModalBody>
                            {footerContent && (
                                <ModalFooter>{footerContent}</ModalFooter>
                            )}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default forwardRef(UiModal);
