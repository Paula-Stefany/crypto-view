import { useState, useEffect } from "react"
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';


interface cardInfosProps{
    active_coins: number;
    market_change: number;
    volume: string;
    market_cap: string;
}


export function Cards(){

    const [cardInfos, setCardInfos] = useState<cardInfosProps>({
        active_coins: 0,
        market_change: 0,
        volume: '',
        market_cap: ''
    });

    function formatValue(value: number){

        const formatedValue = Intl.NumberFormat('en-US', 
            {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
            }
        )

        return formatedValue.format(value);

    }

    useEffect (() =>{

        async function getCardInfos() {


            try{

                const res = await fetch('https://api.coingecko.com/api/v3/global', {
                    headers: {
                        accept: 'application/json'
                    }
                })
                
                const data = await res.json();
                const globalData = data.data;
    
                setCardInfos({
                    active_coins: globalData.active_cryptocurrencies,
                    market_change: globalData.market_cap_change_percentage_24h_usd,
                    volume: formatValue(globalData.total_volume.usd),
                    market_cap: formatValue(globalData.total_market_cap.usd)
                });
                
            } catch (err) {
                console.error('Erro ao buscar os dados do card', err);
            };
            
           
        }

        getCardInfos();

    }, [])

    return(
        <section className="w-full py-8">
            <div className="flex flex-wrap gap-2 justify-center">
                <article className="w-40 h-40 bg-slate-950 text-amber-50 p-3 rounded-2xl shadow-[0_0_20px] shadow-slate-700">
                    <div className="h-[25%] flex items-center">
                        <div className="w-fit bg-slate-900 px-2.5 py-1 rounded-2xl select-none">
                            <h3 className="text-[13px]">Active Coins</h3>
                        </div>
                    </div>
                    <div className="h-[75%] flex justify-center items-center">
                        <p className="text-3xl font-medium">{cardInfos.active_coins.toLocaleString('en-US')}</p>
                    </div>
                </article>

                <article className="w-40 h-40 bg-slate-950 text-amber-50 p-3 rounded-2xl shadow-[0_0_20px] shadow-slate-700">
                    <div className="h-[25%] flex items-center">
                        <div className="w-fit bg-slate-900 px-2.5 py-1 rounded-2xl select-none">
                            <h3 className="text-[13px]">24h Market Change</h3>
                        </div>
                    </div>
                    <div className="h-[75%] flex justify-center items-center">
                        <p className="text-3xl font-medium flex items-center gap-1.5">
                            { cardInfos.market_change < 0 ? <FaArrowDown className="text-red-700" size={22}/> : <FaArrowUp className="text-green-700" size={22}/>}
                            {cardInfos.market_change.toFixed(2)}%</p>
                    </div>
                </article>
                <article className="w-40 h-40 bg-slate-950 text-amber-50 p-3 rounded-2xl shadow-[0_0_20px] shadow-slate-700">
                    <div className="h-[25%] flex items-center">
                        <div className="w-fit bg-slate-900 px-2.5 py-1 rounded-2xl select-none">
                            <h3 className="text-[13px]">24h Volume</h3>
                        </div>
                    </div>
                    <div className="h-[75%] flex justify-center items-center">
                        <p className="text-3xl font-medium">{cardInfos.volume}</p>
                    </div>
                </article>
                <article className="w-40 h-40 bg-slate-950 text-amber-50 p-3 rounded-2xl shadow-[0_0_20px] shadow-slate-700">
                    <div className="h-[25%] flex items-center">
                        <div className="w-fit bg-slate-900 px-2.5 py-1 rounded-2xl select-none">
                            <h3 className="text-[13px]">Market Cap</h3>
                        </div>
                    </div>
                    <div className="h-[75%] flex justify-center items-center">
                        <p className="text-3xl font-medium">{cardInfos.market_cap}</p>
                    </div>
                </article>

            </div>
        </section>   
    )
}
