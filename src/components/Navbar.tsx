import Logo from "@/assets/logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IconLogout, IconX } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { HamBurgerIcon } from "@/icons";
import { CapitalizeWord } from "@/utils";
import { useUserLogout } from "@/hooks/useUserLogout";

interface Props {}

function Navbar({}: Props) {
    const [navOpen, setNavOpen] = useState(false);
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();
    useUserLogout(logout);

    const showToggleButton = useMediaQuery({ query: "(max-width:770px)" });
    const location = useLocation();
    const route = CapitalizeWord(location.pathname.split("/")[1]);

    useEffect(() => {
        if (logout) {
            navigate("/");
        }
    }, [logout]);

    return (
        <nav className="bg-white h-[50px] p-1 px-2 shadow-sm flex justify-between items-center sticky top-0 z-50">
            <div className="w-[140px] flex gap-2 items-center justify-between">
                <img src={Logo} alt="logo image" className="w-full h-full" />
            </div>

            {showToggleButton ? (
                <div
                    className="text-primaryOrange text-2xl w-6 cursor-pointer"
                    onClick={() => setNavOpen((prev) => !prev)}
                >
                    <HamBurgerIcon />
                </div>
            ) : (
                <Button
                    isIconOnly
                    color="primary"
                    className="text-white"
                    onClick={() => setLogout(true)}
                >
                    <IconLogout />
                </Button>
            )}

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
                            className="text-white bg-transparent mr-full flex items-center justify-center"
                            isIconOnly
                        >
                            <IconX />
                        </Button>
                        <div className="h-full">
                            <ul className="flex flex-col justify-center items-center gap-3 font-bold text-white my-auto">
                                {[
                                    "Home",
                                    "Products",
                                    "Categories",
                                    "Topings",
                                    "Orders",
                                ].map((item) => (
                                    <Link
                                        to={item}
                                        className={
                                            route === item
                                                ? "text-primaryOrange"
                                                : "hover:underline hover:text-primaryOrange "
                                        }
                                        onClick={() => setNavOpen(false)}
                                        key={item}
                                    >
                                        <li>{item}</li>
                                    </Link>
                                ))}
                                <p
                                    className="hover:underline hover:text-primaryOrange"
                                    onClick={() =>
                                        console.log("put logout logic here")
                                    }
                                >
                                    <li
                                        className="flex items-center gap-1 tex-md"
                                        onClick={() => setLogout(true)}
                                    >
                                        Logout{" "}
                                        <span>
                                            <IconLogout />
                                        </span>
                                    </li>
                                </p>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
