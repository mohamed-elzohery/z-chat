import React from 'react';
import classes from './DateSign.module.css';

export type DateSignProps = {
    day: string
}

const DateSign: React.FC<DateSignProps> = ({day}) => {
    return  <div className={classes.chat__date}>
                {day}
            </div>
}

export default DateSign;