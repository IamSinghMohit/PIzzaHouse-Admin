import { IconCheese } from "@tabler/icons-react";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { IconStackBackward } from "@tabler/icons-react";
import { IconListDetails } from "@tabler/icons-react";
import { IconCategory2 } from "@tabler/icons-react";

export const TAB = [
    {
        id: "655510801e2da48a28041592",
        key: "home",
        iconText: "Home",
        icon: <IconLayoutDashboard />,
        to: "home",
    },
    {
        id: "6555108a1e2da48a28041593",
        key: "products",
        iconText: "Products",
        icon: <IconCheese />,
        to: "products",
    },
    {
        id: "655510951e2da48a28041594",
        key: "categories",
        iconText: "Categories",
        icon: <IconCategory2 />,
        to: "categories",
    },
    {
        id: "655510a01e2da48a28041595",
        key: "topings",
        iconText: "Topings",
        icon: <IconStackBackward />,
        to: "topings",
    },
    {
        id: "655510aa1e2da48a28041596",
        key: "orders",
        iconText: "Orders",
        icon: <IconListDetails />,
        to: "orders",
    },
];
