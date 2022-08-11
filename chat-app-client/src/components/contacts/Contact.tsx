import React from 'react';
import {  ContactsActions, UserData } from '../../slices/ContactsSlice';
import classes from './Contact.module.css';
import formatDate from '../../utils/DateFormatter';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import truncateText from '../../utils/truncateText';

const maxLettersNumber = 30;


const Contact:React.FC<UserData> = ({name, photo, lastMessage = null, countOfUnseenMessages, _id}) => {
    const dispatch = useAppDispatch();
    const activeContactId = useAppSelector(state => state.Contacts.activeContact?._id) as string;
    // const socket = useAppSelector(state => state.User.socket);

    const handleClick = (e: React.MouseEvent) => {
        dispatch(ContactsActions.setActiveContact({name, photo, _id}));
    };


    return <li className={`${classes.contact__item} btn ${activeContactId === _id ? classes.active : ''}`} onClick={handleClick}>
                <img src={photo} alt="contact img" className={classes.contact__pic} />
                <div className={classes.contact__info}>
                    <h3 className="heading-3">{name}</h3>
                    <p className={classes.contact__message}>{ truncateText(lastMessage?.body || `start conversation with ${name}`, maxLettersNumber)}</p>
                </div>
                <div className={classes.meassage__info}>
                    {lastMessage && <span className={classes.message__time}>{formatDate(lastMessage.date)}</span>}
                    {!!countOfUnseenMessages && <span className={classes.message__count}>{countOfUnseenMessages > 9 ? '+9' : countOfUnseenMessages}</span>}
                </div>
            </li>
}

export default Contact;