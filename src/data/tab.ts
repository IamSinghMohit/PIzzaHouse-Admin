import { BiSolidDashboard } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { PiListNumbersBold } from "react-icons/pi";

export const TAB = [
    {
        id: "655510801e2da48a28041592",
        key: "home",
        iconText: "Home",
        icon: BiSolidDashboard,
        to: "",
    },
    {
        id: "6555108a1e2da48a28041593",
        key: "products",
        iconText: "Products",
        icon: FaBowlFood,
        to: "products",
    },
    {
        id: "655510951e2da48a28041594",
        key: "category",
        iconText: "Categories",
        icon: MdCategory,
        to: "category",
    },
    {
        id: "655510a01e2da48a28041595",
        key: "topings",
        iconText: "Topings",
        icon: HiSquare3Stack3D,
        to: "topings",
    },
    {
        id: "655510aa1e2da48a28041596",
        key: "orders",
        iconText: "Orders",
        icon: PiListNumbersBold,
        to: "orders",
    },
];
