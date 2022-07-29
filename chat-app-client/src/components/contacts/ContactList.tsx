import React from 'react';
import classes from './ContactList.module.css';
import contactOneImage from './contact1.jpg';
import contactTwoImage from './contact2.jpg';
import contactThreeImage from './contact3.jpg';
import { ContactProps } from './Contact';

import Contact from './Contact';

const fakeContactData: ContactProps[] = [
    {
        photo: contactOneImage,
        name: 'john due',
        unseenCount: 2,
        lastMessageDate: 'yesterday',
        lastMessage: 'I am about to come',
    },
    {
        photo: contactTwoImage,
        name: 'Caley Simpson',
        unseenCount: 4,
        lastMessageDate: '04:12',
        lastMessage: 'I am watching a movie',
    },
    {
        photo: contactThreeImage,
        name: 'sara tomasiski',
        unseenCount: 8,
        lastMessageDate: '20:44',
        lastMessage: 'not today',
    },
    
];

const ContactList = () => {
    return <section className={classes.contacts}>
                <ul className={classes.contacts__list}>
                    {fakeContactData.map((contact, index) => <Contact {...contact} key={index}/>)}
                </ul>
            </section>
}

export default ContactList;