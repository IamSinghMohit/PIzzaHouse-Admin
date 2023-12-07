import { Tabs, Tab, Button } from "@nextui-org/react";
import TabIcon from "./TabIcon";
import { Link, useLocation } from "react-router-dom";
import { TAB } from "@/data/tab";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setNavOpen } from "@/store/features/userSlice";
import { useRef} from "react";

interface Props {}

function TabList({}: Props) {
    const location = useLocation();
    const { isNavOpen } = useAppSelector((state) => state.user);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dispatch = useAppDispatch();


    return (
        <>
            {isNavOpen && (
                <Button
                    className="text-white text-4xl absolute top-2 right-2 z-40 mb-3  bg-transparent"
                    onClick={() => dispatch(setNavOpen())}
                    ref={buttonRef}
                    isIconOnly
                >
                    <IoClose />
                </Button>
            )}
            <Tabs
                onSelectionChange={() => dispatch(setNavOpen())}
                classNames={{
                    cursor: "w-full bg-transparent sm:bg-primaryOrange",
                    tabList: "flex flex-col p-0 bg-primaryOrange",
                    base: "w-[max(50%,200px)] sm:w-[130px] bg-white border-b-1 rounded-b-lg shadow-md tablist md:w-[220px]",
                    tabContent: `text-white group-data-[selected=true]:text-primaryOrange sm:text-center text-md sm:text-black sm:group-data-[selected=true]:text-white
                        sm:mr-auto lg:pl-7`,
                }}
                variant="light"
                color="primary"
                radius="none"
                defaultSelectedKey={location.pathname.split("/")[1]}
                className={`transition-all duration-400 animate-appearance-in glass fixed  rounded-none top-0 right-0 ${
                    !isNavOpen && "-right-full"
                } pt-16 flex flex-col gap-5
                sm:block sm:bg-white sm:static sm:pt-0 sm:border-none z-30 h-screen`}
            >
                {TAB.map((tab) => (
                    <Tab
                        key={tab.key}
                        title={
                            <TabIcon
                                icon={<tab.icon />}
                                iconText={tab.iconText}
                            />
                        }
                        as={Link}
                        to={tab.to}
                    />
                ))}
            </Tabs>
        </>
    );
}

export default TabList;
