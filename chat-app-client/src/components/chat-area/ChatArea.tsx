import React, { useEffect, useRef } from 'react';
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

export type ChatAreaProps = {
    message: string,
    messages: Message[],
    setMessages: (msgs: Message[]) => void,
}

    
const ChatArea: React.FC<ChatAreaProps> = ({message, messages,setMessages}) => {

    const area = useRef<HTMLDivElement | null>(null);
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
    }, [socket, activeContact, setMessages]);
    
    useEffect(() => {
        if(area.current) scrollToTheEnd(area.current!);
    } , [messages])

    
    const messagesArray = messages.map((message, index) => {
        const msgDate = getTwelveHoursTime(message.date);
        if(message.sender === sender){
            return <UserMessage body={message.body} date={msgDate} key={message._id || index}/>
        }else{
        return <ForeignerMessage body={message.body} date={msgDate} key={index}/>
        }
    });
        return  <div className={classes.chat__area} ref={area}>
                    <DateSign day="today" />
                    {messagesArray}
                </ div>
            
}

export default ChatArea;