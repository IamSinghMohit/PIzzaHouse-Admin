import Logo from "@/assets/logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { HamBurgerIcon } from "@/icons";

interface Props {}

function Navbar({}: Props) {
    const [navOpen, setNavOpen] = useState(false);
    const showToggleButton = useMediaQuery({ query: "(max-width:770px)" });
    return (
        <nav className="bg-white h-[50px] p-1 px-2 shadow-md flex justify-between items-center">
            <div className="w-[140px]">
                <img src={Logo} alt="logo image" className="w-full h-full" />
            </div>

            {showToggleButton ? (
                <div
                    className="text-primaryOrange text-2xl"
                    onClick={() => setNavOpen((prev) => !prev)}
                >
                    <HamBurgerIcon/>
                </div>
            ) : null}
            <AnimatePresence>
                {navOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="glass h-screen z-20 w-[250px] fixed top-0 right-0"
                    >
                        <Button
                            onClick={() => setNavOpen((prev) => !prev)}
                            className="text-white bg-transparent inline-block mr-full"
                        >
                            <IconX />
                        </Button>
                        <div className="h-full">
                            <ul className="flex flex-col justify-center items-center gap-3 font-bold text-white my-auto">
                                <Link
                                    to={"/"}
                                    className="hover:underline hover:text-primaryOrange"
                                    onClick={() => setNavOpen(false)}
                                >
                                    <li>Home </li>
                                </Link>
                                <Link
                                    to={"/products"}
                                    className="hover:underline hover:text-primaryOrange"
                                    onClick={() => setNavOpen(false)}
                                >
                                    <li>Product</li>
                                </Link>
                                <Link
                                    to={"/categories"}
                                    className="hover:underline hover:text-primaryOrange"
                                    onClick={() => setNavOpen(false)}
                                >
                                    <li>Category</li>
                                </Link>
                                <Link
                                    to={"/topings"}
                                    className="hover:underline hover:text-primaryOrange"
                                    onClick={() => setNavOpen(false)}
                                >
                                    <li>Topings</li>
                                </Link>
                                <Link
                                    to={"/orders"}
                                    className="hover:underline hover:text-primaryOrange"
                                    onClick={() => setNavOpen(false)}
                                >
                                    <li>Order</li>
                                </Link>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
