import React, { useEffect, useRef } from 'react';
import classes from './ChatArea.module.css';
import DateSign from './DateSign';
import {UserMessage, ForeignerMessage} from './CustomMessage';
import { useAppSelector } from '../../hooks/app';
import { Socket } from 'socket.io-client';
import {  Message } from '../../slices/ContactsSlice';
import { formatDay, getTwelveHoursTime, isSameDay } from '../../utils/DateFormatter';
import {v1 as generateRandomKey} from 'uuid';

export type MessageData = {
    body: string,
    date: string,
    sender: string
}

const scrollToTheEnd = <T extends HTMLElement>(element: T) => {
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
            return <UserMessage body={message.body} date={msgDate} key={generateRandomKey()}/>
        }else{
        return <ForeignerMessage body={message.body} date={msgDate} key={generateRandomKey()}/>
        }
    });

    let chatElementsArray: JSX.Element[] = [];
    messagesArray.forEach((message, index) => {
        if( index === 0 ) chatElementsArray[0] = <DateSign day={formatDay(messages[index].date)} key={generateRandomKey()} />;
        chatElementsArray = [...chatElementsArray, message];
        if(!messages[index + 1]) return ;
        if(!isSameDay(new Date(messages[index].date), new Date(messages[index + 1].date))){
            chatElementsArray = [...chatElementsArray,  <DateSign day={formatDay(messages[index + 1].date)} key={generateRandomKey()} />];
        }
    });
        return  <div className={classes.chat__area} ref={area}>
                    {chatElementsArray}
                </ div>
            
}

export default ChatArea;