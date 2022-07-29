import React from 'react';
import classes from './Aside.module.css';
import Profile from '../../components/profile/Profile';
import Nav from '../../components/nav/Nav';
import Search from '../../components/search/Search';
import ContactList from '../../components/contacts/ContactList';

const Aside = () => {
    return <aside className={classes.aside}>
                <Profile />
                <Nav />
                <Search />
                <ContactList />
            </aside>
}

export default Aside;