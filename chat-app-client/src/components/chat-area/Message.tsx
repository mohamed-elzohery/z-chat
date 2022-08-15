import React from 'react';
import classes from './Message.module.css';
// import {BsCircle} from 'react-icons/bs';
// import {BsCheckCircle} from 'react-icons/bs';
// import {BsCheckCircleFill} from 'react-icons/bs';

export type MessageProps = {
    date: string,
    styles: string,
    children: JSX.Element[] | JSX.Element | string,
    isSeen: boolean,
    isSent: boolean,
    isDelivered: boolean,
}
const Message: React.FC<MessageProps> = ({ date, styles, children, isSeen, isSent, isDelivered}) => {

    return  <div className={`${classes.msg} ${classes[styles]}`}>
                <p className={classes.msg__body}>
                    {children}
                </p>
                <span className={classes.msg__date}>
                    {date}
                </span>
                {/* <span className={classes.msg__info}>
                    {isSent ? <BsCheckCircle size={15} fill={'#0000ff'} /> : isDelivered ?
                     <BsCheckCircleFill fill={'#0000ff'} size={15} /> : isSeen ?
                      null : <BsCircle size={15} fill={'#0000ff'} />}
                </span> */}
            </div>
}

export default Message;