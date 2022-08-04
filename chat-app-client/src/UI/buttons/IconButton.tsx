import React from 'react';
import classes from './IconButton.module.css';

export interface IconButoonProps {
    styles: React.CSSProperties
    children: JSX.Element[] | JSX.Element;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


const IconButton: React.FC<IconButoonProps> = ({handleClick, children, styles}) => {
            return <button className={`${classes.btn} ${styles}`} onClick={handleClick}>
                        {children}
                    </button>
}

export default IconButton;