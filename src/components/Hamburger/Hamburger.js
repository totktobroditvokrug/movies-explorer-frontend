import React from 'react';
import './Hamburger.css';
import menu from '../../images/Icon_menu_hamburger.svg';


function Hamburger() {
    //---------- состояния и обработчики попапов форм
const [isPopupOpen, setIsPopupOpen] = React.useState(false);
function handleClickMenu() {
    setIsPopupOpen(true);
}
    return (
        <div>
            <img className="icon__menu" onClick={handleClickMenu} src={menu} alt="Логотип"/>
            {/* <div className={`popup__hamburger ${isPopupOpen&&'popup_on'}`}> тут какой-то текст и ссылки</div> */}
        </div>

   
    );
}    

export default Hamburger;