import React from 'react';
import classes from './Aside.module.css';
import Profile from '../../components/profile/Profile';
import Nav from '../../components/nav/Nav';
import Search from '../../components/search/Search';
import ContactList from '../../components/contacts/ContactList';
import EditProfile from '../../pages/EditProfile';
import { useAppSelector } from '../../hooks/app';
import {AnimatePresence, motion} from 'framer-motion';

const Aside = () => {
    const isProfileEditorOpen = useAppSelector((state) => state.UI.isProfileEditorOpen);

    return <aside className={isProfileEditorOpen ? classes.editor : classes.contacts} >
        <AnimatePresence key="editor" exitBeforeEnter>
            {isProfileEditorOpen ? 
            <motion.div 
            key="editor"  
            initial={{x: '100%', opacity: 0}}
            animate={{x: 0, opacity: 1}} 
            exit={{x: '100%', opacity: 0}} 
            transition={{delay: 0,type: 'tween', duration: .2}}
            >
            <EditProfile />
            </motion.div> 
            : 
            <motion.div
            initial={{x: '-100%', opacity: 0}} 
            animate={{x: 0, opacity: 1}} 
            exit={{x: '-100%', opacity: 0}}
            transition={{delay: 0,type: 'tween', duration: .2}}
            key="profile">
                <Profile />
                <Nav />
                <Search />
                <ContactList />
            </motion.div>
            }
            </AnimatePresence>
        </aside>
}

export default Aside;