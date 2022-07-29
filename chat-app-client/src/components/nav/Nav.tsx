import React from 'react';
import classes from './Nav.module.css';

const Nav = () => {
    return <nav className={classes["contacts__nav"]}>
                <button className={`${classes["contacts__nav-btn"]} btn ${classes.active}`}>Friends</button>
                <button className={`${classes["contacts__nav-btn"]} btn`}>People</button>
          </nav>
}

export default Nav;