import styles from './CoinsTable.module.css';
import { FaBitcoin } from 'react-icons/fa';


export function CoinsTable(){
    return (
        <section className="w-full h-fit flex flex-col gap-12 py-4">
            <table className="w-full bg-slate-950 text-amber-50 shadow-[0_0_20px] shadow-slate-700">
                <thead className={`h-10 border-b border-amber-50 ${styles.thead}`}>
                    <tr>
                        <th scope="col" className="font-medium">Coin</th>
                        <th scope="col" className="font-medium">Market Value</th>
                        <th scope="col" className="font-medium">Price</th>
                        <th scope="col" className="font-medium">Volume</th>
                        <th scope="col" className="font-medium">Change in 24H</th>
                    </tr>
                </thead>
                <tbody className="h-10">
                    <tr>
                        <td data-label='Coin' scope="row" className={`font-normal items-center ${styles.mobileTd}`}> <div className='flex items-center gap-2'><FaBitcoin size={24}/> Bitcoin</div> </td>
                        <td data-label='Market Value' scope="row" className={`font-normal ${styles.mobileTd}`}>20B</td>
                        <td data-label='Price' scope="row" className={`font-normal ${styles.mobileTd}`}>$44,000</td>
                        <td data-label='Volume' scope="row" className={`font-normal ${styles.mobileTd}`}>80B</td>
                        <td data-label='Change in 24H' scope="row" className={`font-normal ${styles.mobileTd}`}>-45%</td>
                    </tr>
                </tbody>
            </table>

            <button className="w-full max-w-2xl h-10 bg-gradient-to-r from-slate-800 to-slate-700 m-auto text-amber-50 rounded-2xl shadow-[0_0_20px] shadow-slate-950 cursor-pointer">
                Load more
            </button>

        </section>
    )
}