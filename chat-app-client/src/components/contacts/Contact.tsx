import React from 'react';
import classes from './Contact.module.css';

export type ContactProps = {
    name: string,
    unseenCount?: number,
    lastMessageDate?: string,
    photo: string,
    lastMessage?: string
}

const Contact:React.FC<ContactProps> = ({name, photo, unseenCount = 2, lastMessageDate = 'yesterday', lastMessage='hello bro'}) => {
    return <li className={`${classes.contact__item} btn`}>
                <img src={photo} alt="contact img" className={classes.contact__pic} />
                <div className={classes.contact__info}>
                    <h3 className="heading-3">{name}</h3>
                    <p className={classes.contact__message}>{lastMessage}</p>
                </div>
                <div className={classes.meassage__info}>
                    <span className={classes.message__time}>{lastMessageDate}</span>
                    <span className={classes.message__count}>{unseenCount}</span>
                </div>
            </li>
}

export default Contact;