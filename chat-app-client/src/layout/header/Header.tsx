import React from 'react';
import classes from './Header.module.css';
import { ActiveContactData } from '../../slices/ContactsSlice';


const Header:React.FC<ActiveContactData> = ({name, photo}) => {
    
    return  <header className={`${classes.header} ${classes.chat}`}>
                <div className={classes.chat__info}>
                    <img src={photo} alt="active contact" className={classes.chat__img} />
                    <h1 className="heading-1">{name}</h1>
                    {/* {isOnline && <span className={classes.chat__online}></span>} */}
                </div>
                <div className={classes.chat__controls}>
                    <svg className={`${classes.mute__icon} btn`}>
                        <use href="imgs/sprite.svg#icon-bell" />
                    </svg>
                </div>
            </header>
}

export default Header;