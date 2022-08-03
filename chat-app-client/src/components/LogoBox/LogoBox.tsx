import React from 'react';
import classes from './LogoBox.module.css';
import logoImage from './logo.svg';

export interface LogoBoxI {
    isLoading?: boolean;
}

const LogoBox: React.FC<LogoBoxI> = ({isLoading = false}) => {
    return <div className={classes.logo}>
            <img src={logoImage} alt="z-logo" className={`${classes.logo__img} ${isLoading && classes.loading}`} />
            <h1 className={classes.logo__txt}>Chat</h1>
            </div>
}

export default LogoBox;