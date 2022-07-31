import React from 'react';
import classes from './Message.module.css';

export type MessageProps = {
    date: string,
    styles: string,
    children: JSX.Element[] | JSX.Element | string
}
const Message: React.FC<MessageProps> = ({ date, styles, children}) => {
    return  <div className={`${classes.msg} ${classes[styles]}`}>
                <p className={classes.msg__body}>
                    {children}
                </p>
                <span className={classes.msg__date}>
                    {date}
                </span>
            </div>
}

export default Message;