import { useAppDispatch, useAppSelector } from "@/hooks/state"
import Logo from "@/assets/logo.svg"
import { FaHamburger } from "react-icons/fa";
import { setNavOpen } from "@/store/features/userSlice";

interface Props {
  
}

function Navbar({}:Props){
    const  {isNavOpen}= useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    
  return (
            <nav className="bg-white h-[50px] p-1 px-2 shadow-md flex justify-between items-center">
                <div className="w-[140px]">
                    <img
                        src={Logo}
                        alt="logo image"
                        className="w-full h-full"
                    />
                </div>

                {!isNavOpen && (
                    <div
                        className="text-primaryOrange text-2xl sm:hidden"
                        onClick={() => dispatch(setNavOpen())}
                    >
                        <FaHamburger />
                    </div>
                )}
            </nav>
  )
}

export default Navbar   