import React, { useEffect, useState } from 'react';
import classes from './ContactList.module.css';
// import { ContactProps } from './Contact';

import Contact from './Contact';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import { ContactsActions } from '../../slices/ContactsSlice';
import Spinner from '../Spinner';
import { getAllContacts } from '../../API/ContactsRequests';


const ContactList = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(state => state.Contacts.contacts);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllContacts().then(res => {
            console.log(res.data.contacts);
            dispatch(ContactsActions.getContacstData(res.data.contacts));
        }).catch(console.log)
        .finally(() => setIsLoading(false));

    }, [dispatch]);

    if(isLoading) return <Spinner styles={{width: '5rem', height: '5rem'}} />;
    if(!isLoading && contacts.length === 0) return <p>No Users To Show</p>;
    
    return <section className={classes.contacts}>
                <ul className={classes.contacts__list}>
                    {contacts.map(({name, photo, _id, countOfUnseenMessages, lastMessage}) => <Contact
                        name={name}
                        photo={process.env.REACT_APP_AWS_DOMAIN + photo} 
                        key={_id}
                        _id={_id}
                        lastMessage={lastMessage}
                        countOfUnseenMessages={countOfUnseenMessages}
                        />)}
                </ul>
            </section>
}

export default ContactList;