import { Outlet } from "react-router";


export function Header(){
    return(
        <>
        <header>
            CoinView
        </header>
        <Outlet/>
        </>
    )
}