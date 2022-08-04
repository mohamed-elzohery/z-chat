import React from 'react';
import classes from './Aside.module.css';
import Profile from '../../components/profile/Profile';
import Nav from '../../components/nav/Nav';
import Search from '../../components/search/Search';
import ContactList from '../../components/contacts/ContactList';
import EditProfile from '../../pages/EditProfile';
import { useAppSelector } from '../../hooks/app';

const Aside = () => {
    const isProfileEditorOpen = useAppSelector((state: any) => state.UI.isProfileEditorOpen);
    console.log(isProfileEditorOpen);

    if(isProfileEditorOpen) return  <aside className={classes.editor}>
                                        <EditProfile name='Mohamed Elzohery' status='Im available now' />
                                    </aside>;

    return  <aside className={classes.contacts}>
                <Profile />
                <Nav />
                <Search />
                <ContactList />
            </aside>
}

export default Aside;