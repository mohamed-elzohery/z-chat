import React from 'react';
import classes from './Search.module.css';

const Search = () => {
    return <div className={classes.search}>
                <label htmlFor="search" className={classes.search__label}>
                    <svg className={classes.search__icon}>
                        <use href="imgs/sprite.svg#icon-search" />
                    </svg>
                    <input id="search" type="text" className={classes.search__input} placeholder="search people"/>
                    </label>
            </div>
}

export default Search;