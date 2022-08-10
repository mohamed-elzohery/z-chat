import React from 'react';
import {  UserData } from '../../slices/ContactsSlice';
import classes from './Contact.module.css';
import formatDate from '../../utils/DateFormatter';


const Contact:React.FC<UserData> = ({name, photo, lastMessage = null, countOfUnseenMessages}) => {
    return <li className={`${classes.contact__item} btn`}>
                <img src={photo} alt="contact img" className={classes.contact__pic} />
                <div className={classes.contact__info}>
                    <h3 className="heading-3">{name}</h3>
                    <p className={classes.contact__message}>{lastMessage?.body || `start conversation with ${name}`}</p>
                </div>
                <div className={classes.meassage__info}>
                    {lastMessage && <span className={classes.message__time}>{formatDate(lastMessage.date)}</span>}
                    {!!countOfUnseenMessages && <span className={classes.message__count}>{countOfUnseenMessages}</span>}
                </div>
            </li>
}

export default Contact;