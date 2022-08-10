import React from 'react';
import classes from './Main.module.css';
import Header from '../header/Header';
import ChatArea from '../../components/chat-area/ChatArea';
import Sender from '../../components/send-box/Sender';
import { useAppSelector } from '../../hooks/app';
import LogoBox from '../../components/LogoBox/LogoBox';
import { motion } from 'framer-motion';

const wlecomeBoardVariants = {
    initial: {
        scale: 0,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: .25
        }
    }
}

const Main = () => {
    const activeContact = useAppSelector(state => state.Contacts.activeContact);

    return  <main className={classes.main}>
                {activeContact ? <>
                    <Header name={activeContact.name}  photo={activeContact.photo} _id={activeContact._id}/>
                    <ChatArea />
                    <Sender />
                </>: <motion.div 
                        variants={wlecomeBoardVariants}  
                        className={classes.inactive__board}
                        initial="initial"
                        animate="animate"
                        >
                        <LogoBox />
                        <p className={classes.welocme__txt}>Welcome to Zchat</p>
                        <p className={classes.inactive__txt}>Send and receive messages with your contacts</p>
                    </motion.div>}
            </main>
}

export default Main;