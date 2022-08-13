import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/app';
import classes from './Sender.module.css';

export type SenderProps = {
    message: string,
    setMessage: (msg: string) => void,
    sendMessageToChat: () => void
}

const Sender: React.FC<SenderProps> = ({message, setMessage, sendMessageToChat}) => {

    const input = useRef<HTMLInputElement | null>(null);
    const {socket} = useAppSelector(state => state.User)!;
    const activeContact = useAppSelector(state => state.Contacts.activeContact);

    useEffect(() => {
        if(input.current) input.current.focus();
    }, [activeContact])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket?.emit('send-to-server', {receiver: activeContact?._id, body: message});
        sendMessageToChat();
        setMessage("");
    }


    return  <form  className={classes.chat__send} onSubmit={handleSend}>
                <input 
                    type="text" 
                    className={classes.chat__input} 
                    name="message" 
                    id="message" 
                    placeholder="Write Something"
                    value={message} 
                    onChange={handleChange}
                    ref={input}
                    />
                <button type="submit" className={classes.btn__send}>
                    <svg className={classes.send__icon}>
                        <use href="imgs/sprite.svg#icon-compass" />
                    </svg>
                </button> 
            </form>
}

export default Sender;