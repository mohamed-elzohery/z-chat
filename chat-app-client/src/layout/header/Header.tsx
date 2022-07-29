import React from 'react';
import classes from './Header.module.css';

export type ContactProps = { 
    name: string,
    isOnline: boolean,
    contactImage: string,
}

const Header:React.FC<ContactProps> = ({name, isOnline, contactImage}) => {
    return  <header className={`${classes.header} ${classes.chat}`}>
                <div className={classes.chat__info}>
                    <img src={contactImage} alt="active contact" className={classes.chat__img} />
                    <h1 className="heading-1">{name}</h1>
                    {isOnline && <span className={classes.chat__online}></span>}
                </div>
                <div className={classes.chat__controls}>
                    <svg className={`${classes.mute__icon} btn`}>
                        <use href="imgs/sprite.svg#icon-bell" />
                    </svg>
                </div>
            </header>
}

export default Header;