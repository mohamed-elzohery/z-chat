import React, { useEffect, useRef, useState } from 'react';
import classes from './ChatArea.module.css';
import DateSign from './DateSign';
import {UserMessage, ForeignerMessage} from './CustomMessage';
import { useAppSelector } from '../../hooks/app';
import { Socket } from 'socket.io-client';
import {  Message } from '../../slices/ContactsSlice';
import { getTwelveHoursTime } from '../../utils/DateFormatter';

export type MessageData = {
    body: string,
    date: string,
    sender: string
}

const scrollToTheEnd = <T extends HTMLElement>(element: T) => {
    console.log(element);
    element.scrollTop = element.scrollHeight;
};

    
const ChatArea = () => {

    const area = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    // const [isLoading, setI]
    const socket = useAppSelector(state => state.User.socket) as Socket;
    const activeContact = useAppSelector(state => state.Contacts.activeContact?._id) as string;
    const sender = useAppSelector(state => state.User._id);

    
    useEffect(()=> {

        socket.on('load-messages', (messages: Message[]) => {
            setMessages(messages);
        });
        socket.emit('load-messages', activeContact);

        return () => {socket.off('load-messages'); setMessages([])}
    }, [socket, activeContact]);
    
    useEffect(() => {
        if(area.current) scrollToTheEnd(area.current!);
    } , [messages])

    const messagesArray = messages.map((message, index) => {
        message.date = getTwelveHoursTime(message.date);
        if(message.sender === sender){
            return <UserMessage body={message.body} date={message.date} key={message._id}/>
        }else{
        return <ForeignerMessage body={message.body} date={message.date} key={index}/>
        }
    });
    return  <div className={classes.chat__area} ref={area}>
                <DateSign day="today" />
                {messagesArray}
                <div ref={area} />
            </ div>
        
}

export default ChatArea;