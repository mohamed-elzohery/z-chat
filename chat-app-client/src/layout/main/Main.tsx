import React, {useEffect, useState} from 'react';
import classes from './Main.module.css';
import Header from '../header/Header';
import ChatArea from '../../components/chat-area/ChatArea';
import Sender from '../../components/send-box/Sender';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import LogoBox from '../../components/LogoBox/LogoBox';
import { motion } from 'framer-motion';
import { ContactsActions, Message } from '../../slices/ContactsSlice';
import { Socket } from 'socket.io-client';

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
    const sender = useAppSelector(state => state.User._id);
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = useAppSelector(state => state.User.socket) as Socket;
    
    useEffect( () => {
        if(socket){
            socket.on('send-to-contact', (message: Message) => {
                if(activeContact && message.sender === activeContact._id){
                  dispatch(ContactsActions.recieveMessageActive({message}));
                  socket.emit('read-all', activeContact._id);
                  setMessages([...messages, message]);
                }
            });
        }
    }, [socket, dispatch, activeContact, messages]);


    const sendMessageToChat = () => {
        const now = new Date().toISOString();
        const msgToSend: Message = {
            sender: sender,
            receiver: activeContact?._id!,
            body: message,
            date: now,
            isSeen: false,
        }
        setMessages([...messages, msgToSend]);
        dispatch(ContactsActions.sendMessage(msgToSend));
    }

    return  <main className={classes.main}>
                {activeContact ? <>
                    <Header name={activeContact.name}  photo={activeContact.photo} _id={activeContact._id}/>
                    <ChatArea 
                        message={message} 
                        messages={messages} 
                        setMessages={setMessages} 
                    />
                    <Sender message={message} setMessage={setMessage} sendMessageToChat={sendMessageToChat} />
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