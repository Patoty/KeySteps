import Link from "next/link";
import logo from "../assets/steps.svg";
import Image from "next/image";

export default function Navigation() {
    return (
        <div className="py-2 px-4 rounded-full my-4 grid grid-flow-col border-gray-200 border justify-between bg-white drop-shadow-sm max-w-screen-xl mx-auto">
            <div className="flex space-x-4 items-center mx-2"><Image src={logo} alt="logo" width={128} />
                <nav><ul className="flex space-x-8 font-medium ml-4"><li>
                    <Link href={"/"} className="hover:text-primary-hover transition-all">HOME</Link>
                </li>
                    <li>
                        <Link href={"/about"} className="hover:text-primary-hover transition-all">ABOUT</Link>
                    </li>
                    <li>
                        <Link href={"/"} className="hover:text-primary-hover transition-all">IMPRINT</Link>
                    </li>
                </ul></nav>
            </div>
            <div>
                <Link href={"/discover"} className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-full">Find A Home</Link>
            </div>
        </div>
    )
}
