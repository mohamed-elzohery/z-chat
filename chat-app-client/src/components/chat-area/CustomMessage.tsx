import React from 'react';
import Message from './Message';

type CustomMessageProps = {
    date: string,
    body: string
}

export const UserMessage: React.FC<CustomMessageProps> = ({date, body}) => {
    return  <Message date={date} styles='msg--user'>{body}</Message>
}

export const ForeignerMessage: React.FC<CustomMessageProps> = ({date, body}) => {
    return  <Message date={date} styles='msg--contact'>{body}</Message>
}
