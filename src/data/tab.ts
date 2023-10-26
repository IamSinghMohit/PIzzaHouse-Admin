import { BiSolidDashboard } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { PiListNumbersBold } from "react-icons/pi";

export const TAB = [
    {
        key:'home',
        iconText:'Home',
        icon:BiSolidDashboard ,
        to:'',
    },
    {
        key:'products',
        iconText:'Products',
        icon:FaBowlFood ,
        to:'products',
    },
    {
        key:'category',
        iconText:'Categories',
        icon:MdCategory,
        to:'category',
    },
    {
        key:'topings',
        iconText:'Topings',
        icon:HiSquare3Stack3D ,
        to:'topings',
    },
    {
        key:'orders',
        iconText:'Orders',
        icon:PiListNumbersBold ,
        to:'orders',
    },
]
