import superman from '../NotFound/img/superman.gif'
import clouds from '../NotFound/img/clouds.png'
import './NotFound.css'

export default function NotFound() {
    return(
        <div className='mainBlock'>
            <div className="sky">
                <img className='cloud cloud1' src={clouds} alt="clouds" />
                <img className='cloud cloud2' src={clouds} alt="clouds" />
                <img className='cloud cloud3' src={clouds} alt="clouds" />
                <img className='cloud cloud4' src={clouds} alt="clouds" />
                <img className='cloud cloud5' src={clouds} alt="clouds" />
                <img className='cloud cloud6' src={clouds} alt="clouds" />
            </div>
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
                    <p className='oops'>Упс!</p>
                    <p className='text1'>Схоже, щось пішло не так...</p>
                    <p className='text2'>Але не засмучуйтесь — Супермен уже летить вам на допомогу!</p>
                </div>
                <p className='text3'>Ви можете пошукати потрібну інформацію <strong>тут</strong>. А якщо вам тут сподобалося — повертайтесь ще! За адресою, яку самі вигадаєте</p>
            </div>
        </div>
        
    )
}