import { Outlet } from "react-router";
import { FaBitcoin } from 'react-icons/fa';
import { Link } from "react-router";


export function Header(){
    return(
        <>
        <header className="w-full py-14 flex justify-center text-amber-50">
            <Link to={'/'}>
                <div className="flex items-center gap-2">
                    <FaBitcoin className="text-[32px] md:text-[40px]" />
                    <h1 className="text-3xl font-semibold md:text-4xl">CryptoView</h1>

                </div>
            </Link>
        </header>
        <main className="w-full max-w-7xl m-auto  px-5">
            <Outlet/>
        </main>
        </>
    )
}