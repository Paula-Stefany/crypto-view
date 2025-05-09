import { useEffect, useState } from "react";
import { useParams } from "react-router";


interface Coin{
    id: string;
    coin: string;
    icon: string;
    price: number;
    volume: number;
    marketCap: number;
    priceChange24h: number;
    symbol: string;
    market_cap_rank: number;
}

interface CoinApiResponse{
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | {
        times: number;
        currency: string;
        percentage: number;
    };
    last_updated: string;
    
}

export function Details(){

    const { id } = useParams();

    const [coin, setCoin] = useState<Coin>({
        id: '',
        coin: '',
        icon: '',
        price: 0,
        volume: 0,
        marketCap: 0,
        priceChange24h: 0,
        symbol: '',
        market_cap_rank: 0
    })

    function formatValue(value: number){

        const formatedValue = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact'
        })

        return formatedValue.format(value);
    }

    function formatPercentage(value: number){

        return `${value.toFixed(2)}%`;

    }

    useEffect(() => {

        async function getCoin(){

            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`;

            try{

                const res = await fetch(url, {
                    headers: {
                        accept: 'application/json'
                    }
                });

                if(!res.ok){
                     throw new Error(`Response status': ${res.status}`)
                }

                const apiCoin = await res.json() as CoinApiResponse[];
                
                const formatedCoin: Coin = {
                    id: apiCoin[0].id,
                    coin: apiCoin[0].name,
                    icon: apiCoin[0].image,
                    price: apiCoin[0].current_price,
                    volume: apiCoin[0].total_volume,
                    marketCap: apiCoin[0].market_cap,
                    priceChange24h: apiCoin[0].price_change_percentage_24h,
                    symbol: apiCoin[0].symbol,
                    market_cap_rank: apiCoin[0].market_cap_rank
                }

                setCoin(formatedCoin);
                
            } catch (error){
                console.error(error);
            }

        }

        getCoin();

    }, []);

    return(
        <section className="w-full justify-center flex py-8">
            <article className="w-[300px] h-[450px] bg-slate-950 shadow-[0_0_20px] shadow-slate-700  p-4 text-amber-50 flex flex-col justify-center gap-6 md:w-[450px]">
                <img src={coin.icon}  className="flex mx-auto w-14 h-14" alt={coin.coin}></img>
                <div className="flex gap-2 mx-auto text-xl font-medium">
                    <h2>{coin.coin}</h2>
                    <span>|</span>
                    <span>{coin.symbol}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-lg flex justify-between"><span className="font-medium">Market Cap Rank:</span> {coin.market_cap_rank}</p>
                    <p className="text-lg flex justify-between"><span className="font-medium">Coin: </span> {coin.coin}</p>
                    <p className="text-lg flex justify-between"><span className="font-medium">Price:</span> {formatValue(coin.price)}</p>
                    <p className="text-lg flex justify-between"><span className="font-medium">Volume:</span> {formatValue(coin.volume)}</p>
                    <p className="text-lg flex justify-between"><span className="font-medium">Market Cap:</span> {formatValue( coin.marketCap)}</p>
                    <p className={`text-lg flex justify-between ${coin.priceChange24h < 0 ? 'text-red-600' : 'text-green-600'}`}><span className="font-medium text-amber-50">Price Change 24h:</span> {formatPercentage(coin.priceChange24h)}</p>
                </div>
            </article>
        </section>
    )
}