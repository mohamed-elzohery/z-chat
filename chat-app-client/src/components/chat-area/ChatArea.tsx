import React from 'react';
import classes from './ChatArea.module.css';
import DateSign from './DateSign';
import {UserMessage, ForeignerMessage} from './CustomMessage';

export type MessageData = {
    body: string,
    date: string,
    sender: string
}

const messagesData: MessageData[] = [
    {
        body: "Hello A5oya el tekha",
        date: "02:44",
        sender: 'sasa'
    },
    {
        body: "Hello A5oya el Sasa",
        date: "02:44",
        sender: 'tekha'
    },
    {
        body: "Hello A5oya el tekha",
        date: "02:44",
        sender: 'sasa'
    },
    {
        body: "Hello A5oya el Sasa",
        date: "02:44",
        sender: 'tekha'
    },
    {
        body: "Hello A5oya el tekha",
        date: "02:44",
        sender: 'sasa'
    },
    {
        body: "Hello A5oya el Sasa",
        date: "02:44",
        sender: 'tekha'
    },
    {
        body: "Hello A5oya el tekha",
        date: "02:44",
        sender: 'sasa'
    },
    {
        body: "Hello A5oya el Sasa",
        date: "02:44",
        sender: 'tekha'
    },
    {
        body: "Hello A5oya el tekha",
        date: "02:44",
        sender: 'sasa'
    },
    {
        body: "Hello A5oya el Sasa",
        date: "02:44",
        sender: 'tekha'
    },
    {
        body: "Hello A5oya el tekha",
        date: "02:44",
        sender: 'sasa'
    },
    {
        body: "Hello A5oya el Sasa",
        date: "02:44",
        sender: 'tekha'
    },
]

const ChatArea = () => {
    const messagesArray = messagesData.map((message, index) => {
        if(message.sender === 'sasa'){
            return <UserMessage body={message.body} date={message.date} key={index}/>
        }
        return <ForeignerMessage body={message.body} date={message.date} key={index}/>
    });
    return  <div className={classes.chat__area}>
                <DateSign day="today" />
                {messagesArray}
            </div>
        
}

export default ChatArea;