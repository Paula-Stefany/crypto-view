import { useEffect, useState } from 'react';
import styles from './CoinsTable.module.css';


interface Coins{
    id: string;
    coin: string;
    icon: string;
    price: number;
    volume: number;
    marketCap: number;
    priceChange24h: number;
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


export function CoinsTable(){

    const [coins, setCoins] = useState<Coins[]>([]);
    const [page, setPage] = useState<number>(1);
       

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

    function handleGetMore(){
        setPage((prevPage) => prevPage + 1);

    }

    useEffect(() =>{

        async function getCoins() {

            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${page}`

            try{
                const response = await fetch(url , {
                    headers:{
                        accept: 'application/json'
                    }
                    
                });

                if (!response.ok){
                    throw new Error(`Response status': ${response.status}`)
                }

                const allCoins = await response.json() as CoinApiResponse[];

                const coinsData: Coins[] = allCoins.map((coin) => (
                    {
                        id: coin.id,
                        coin: coin.name,
                        icon: coin.image,
                        price: coin.current_price,
                        volume: coin.total_volume,
                        marketCap: coin.market_cap,
                        priceChange24h: coin.price_change_percentage_24h
                    }
                ))

                setCoins((prevCoins) => [...prevCoins, ...coinsData]);

            } catch(error){
                console.error(error);
            }
        }

        getCoins();

    }, [page]);

    return (
        <section className="w-full h-fit flex flex-col gap-12 py-4">
            <table className="w-full text-amber-50 shadow-[0_0_20px] shadow-slate-700 bg-gradient-to-r from-slate-400 via-sky-200 to-slate-500">
                <thead className={`h-12 border-b border-amber-50 ${styles.thead}`}>
                    <tr>
                        <th scope="col" className="font-medium bg-slate-950 md:border-2 md:border-black md:w-[320px]">Coin</th>
                        <th scope="col" className="font-medium bg-slate-950 md:border-2 md:border-black">Market Value</th>
                        <th scope="col" className="font-medium bg-slate-950 md:border-2 md:border-black">Price</th>
                        <th scope="col" className="font-medium bg-slate-950 md:border-2 md:border-black">Volume</th>
                        <th scope="col" className="font-medium bg-slate-950 md:border-2 md:border-black ">Price Change in 24H</th>
                    </tr>
                </thead>
                <tbody className="h-10">
                    { coins.map((coin) => (
                        <tr key={coin.id} className={`bg-slate-950  ${styles.mobileTr} `}>
                            <td data-label='Coin' scope="row" className={`font-normal items-center ${styles.mobileTd} py-[18px] px-[10px] md:border-2 md:border-black`}> <div className='flex items-center gap-2'><img src={coin.icon} className='h-6 w-6' alt={coin.coin} /> {coin.coin}</div> </td>
                            <td data-label='Price' scope="row" className={`font-normal ${styles.mobileTd} py-[18px] px-[10px] md:border-2 md:border-black`}>{formatValue(coin.price)}</td>
                            <td data-label='Volume' scope="row" className={`font-normal ${styles.mobileTd} py-[18px] px-[10px] md:border-2 md:border-black`}>{formatValue(coin.volume)}</td>
                            <td data-label='Market Cap' scope="row" className={`font-normal ${styles.mobileTd} py-[18px] px-[10px] md:border-2 md:border-black`}>{formatValue(coin.marketCap)}</td>
                            <td data-label='Change in 24H' scope="row"  className={`font-normal ${styles.mobileTd} py-[18px] px-[10px] md:border-2 md:border-black ${ coin.priceChange24h < 0 ? 'text-red-600' : 'text-green-600' }`}>{formatPercentage(coin.priceChange24h)}</td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>

            <button className="w-full max-w-2xl h-10 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 m-auto text-amber-50 rounded-2xl shadow-[0_0_20px] shadow-slate-950 cursor-pointer" onClick={handleGetMore}>
                Load more
            </button>

        </section>
    )
}