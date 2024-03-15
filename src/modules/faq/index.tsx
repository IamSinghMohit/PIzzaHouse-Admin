import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
} from "@nextui-org/react";

type Props = {};

function FaqPage({}: Props) {
    return (
        <div className="p-2 min-h-screen">
            <Card
                radius="sm"
                shadow="sm"
                className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20"
            >
                <CardHeader className="font-bold">FAQ page</CardHeader>
                <CardBody>
                    <a
                        href={import.meta.env.VITE_CLOUDINARY_PERSONAL_SITE_URL}
                        target="_blank"
                        className="text-primaryOrange underline"
                    >
                        know more about me 💡
                    </a>
                    <h6 className="text-gray-700">Prefer watching a video😇</h6>
                    <div className="relative pb-[56.25%] max-w-[560px] h-0 max-h-[315px]">
                        <iframe
                            className="w-full h-full absolute top-0 left-0 max-h-[315px] max-w-[560px]"
                            src="https://www.youtube.com/embed/QhWyXj2bQFc?si=dlOpTrL0SjlG__eC"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                    <Accordion>
                        <AccordionItem
                            key="1"
                            aria-label="Accordion 1"
                            title="Why any database operations are not allowed ?"
                            classNames={{
                                title: "font-bold",
                            }}
                        >
                            All my backend serverices are relying on free tier
                            and that's why i don't want to spoil any thing. If i
                            don't do this then i could get charged unnecessarily
                        </AccordionItem>
                        <AccordionItem
                            key="2"
                            aria-label="Accordion 2"
                            title="Why this site is not build using Next.js"
                            classNames={{
                                title: "font-bold",
                            }}
                        >
                            First of all it is a admin dashboard so it won't
                            make sense to make it <b>SEO</b> friendly
                        </AccordionItem>
                    </Accordion>
                </CardBody>
            </Card>
        </div>
    );
}

export default FaqPage;
