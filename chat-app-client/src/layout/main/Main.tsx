import React from 'react';
import classes from './Main.module.css';
import Header from '../header/Header';
import ChatArea from '../../components/chat-area/ChatArea';
import Sender from '../../components/send-box/Sender';
import ContactImage from '../../components/contacts/contact1.jpg';

const Main = () => {
    return  <main className={classes.main}>
                <Header name='John Due' isOnline={true} contactImage={ContactImage} />
                <ChatArea />
                <Sender />
            </main>
}

export default Main;