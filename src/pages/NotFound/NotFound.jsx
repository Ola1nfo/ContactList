import superman from '../NotFound/img/superman.gif'
import './NotFound.css'

export default function NotFound() {
    return(
        <div className='mainBlock'>
            <div className='errorBlock'>
                <span>4</span>
                <div className='letterImg'>
                    <img className='supermanTop' src={superman} alt="superman" />
                    <p className='letterOTop'>O</p>
                    <img className='supermanBehind' src={superman} alt="superman" />
                    <p className='letterO'>O</p>
                    <img className='supermanFront' src={superman} alt="superman" />
                </div>
                <span>4</span>
            </div>
            <div className='title'>
                <div className="titleText">
                    <p>Упс</p>
                    <p>Щось пішло не так</p>
                    <p>Але не засмучуйтеся. Допомога уже в дорозі</p>
                </div>
                <p>Ви можете пошукати потрібну інформацію тут: . Якщо вам тут сподобалося, приходьте ще - за адресою яку самі придумаєте</p>
            </div>
        </div>
        
    )
}