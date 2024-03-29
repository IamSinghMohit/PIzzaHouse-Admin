import {
    IconAntennaBars5,
    IconCreditCardFilled,
    IconCurrencyRupee,
    IconUserPlus,
    IconUsers,
} from "@tabler/icons-react";
import CandleStickChart from "./CandleStickChart";
import IncomeAreaChart from "./IncomeAreaChart";
import ReportAreaChart from "./ReportAreaChart";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { ReactNode } from "react";

const DashboardCards = [
    {
        id: "34447ce8-bf49-4c31-bafa-699d4e5c4481",
        icon: <IconCreditCardFilled width={40} height={40} />,
        headerTitle: "Today's Money",
        headerValue: "53k",
        footerValue: "+55%",
        footerTitle: "than last week",
        showRupeeIcon: true,
        increased: true,
    },
    {
        id: "f4b4a364-c1c5-43bf-b808-c9dc7ca533a4",
        icon: <IconUsers width={40} height={40} />,
        headerTitle: "Today's Users",
        headerValue: "2,300",
        footerValue: "+3%",
        footerTitle: "than last month",
        showRupeeIcon: false,
        increased: true,
    },
    {
        id: "58edc990-f968-4f0e-a549-622d56f5db62",
        icon: <IconUserPlus width={40} height={40} />,
        headerTitle: "New Clients",
        headerValue: "3462",
        footerValue: "-2%",
        footerTitle: "than last week",
        showRupeeIcon: false,
        increased: false,
    },
    {
        id: "8d99defa-6e3c-42ef-bd8e-17ea6d6bbe3f",
        icon: <IconAntennaBars5 width={40} height={40} />,
        headerTitle: "Sales",
        headerValue: "532,846",
        footerValue: "+5%",
        footerTitle: "than yesterday",
        showRupeeIcon: true,
        increased: true,
    },
];

function index() {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 col-span-2 gap-2">
                {DashboardCards.map(
                    ({
                        icon,
                        headerValue,
                        headerTitle,
                        footerValue,
                        footerTitle,
                        showRupeeIcon,
                        increased,
                        id,
                    }) => (
                        <AdminCard
                            key={id}
                            icon={icon}
                            headerTitle={headerTitle}
                            headerValue={headerValue}
                            footerValue={footerValue}
                            footerTitle={footerTitle}
                            showRupeeIcon={showRupeeIcon}
                            increased={increased}
                        />
                    ),
                )}
            </div>
            <div className="grid  gap-2 grid-cols-1 grid-rows-3 sm:grid-rows-2 sm:grid-cols-2">
                <IncomeAreaChart />
                <ReportAreaChart />
                <CandleStickChart className="sm:col-span-2" />
            </div>
        </div>
    );
}

export default index;

type Props = {
    icon: ReactNode;
    headerTitle: string;
    headerValue: string;
    footerTitle: string;
    footerValue: string;
    showRupeeIcon: boolean;
    increased: boolean;
};

function AdminCard({
    icon,
    headerTitle,
    headerValue,
    footerValue,
    footerTitle,
    showRupeeIcon,
    increased,
}: Props) {
    return (
        <Card radius="sm" className="h-[145px]">
            <CardHeader className="flex items-center justify-between gap-2">
                <div className="p-3 rounded-xl bg-primaryOrangeAlpha">
                    <div className="p-1 bg-primaryRed rounded-2xl text-white">
                        {icon}
                    </div>
                </div>
                <div className="text-gray-500 flex flex-col items-end">
                    <span>{headerTitle}</span>
                    <p className="text-black text-xl flex items-center font-bold">
                        {showRupeeIcon && (
                            <span>
                                <IconCurrencyRupee />
                            </span>
                        )}
                        {headerValue}
                    </p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="text-gray-500 flex-row">
                <span
                    className={`${
                        increased ? "text-green-400" : "text-red-600"
                    } font-bold mr-1`}
                >
                    {footerValue}
                </span>{" "}
                {footerTitle}
            </CardBody>
        </Card>
    );
}
