import { Cards } from '../../components/cards'
import { CoinsTable } from '../../components/coinsTable'


export function Home(){
    return(
        <div className='flex-col'>
            <Cards/>
            <CoinsTable/>
        </div>
    )
}