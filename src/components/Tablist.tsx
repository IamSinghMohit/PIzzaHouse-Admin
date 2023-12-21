import { Tabs, Tab } from "@nextui-org/react";
import TabIcon from "./TabIcon";
import { Link, useLocation } from "react-router-dom";
import { TAB } from "@/data/tab";

interface Props {}

function TabList({}: Props) {
    const location = useLocation();

    return (
        <Tabs
            classNames={{
                cursor: "w-full w-full h-[45px]",
                tabList: "flex flex-col p-0 gap-4",
                base: "bg-white border-b-1 rounded-b-lg w-[220px]",
                tabContent: `group-data-[selected=true]:text-white text-md w-[220px] mt-3 ml-3`,
            }}
            variant="light"
            color="primary"
            radius="none"
            defaultSelectedKey={location.pathname.split("/")[1]}
        >
            {TAB.map((tab) => (
                <Tab
                    key={tab.key}
                    title={<TabIcon icon={tab.icon} iconText={tab.iconText} />}
                    as={Link}
                    to={tab.to}
                />
            ))}
        </Tabs>
    );
}

export default TabList;
