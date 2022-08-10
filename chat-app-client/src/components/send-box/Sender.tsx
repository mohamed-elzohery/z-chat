import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/app';
import classes from './Sender.module.css';

const Sender = () => {
    const {socket} = useAppSelector(state => state.User)!;
    const activeContact = useAppSelector(state => state.Contacts.activeContact);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket?.emit('send-to-server', {_id: activeContact?._id, body: message});
        setMessage("");
    }


    return  <form className={classes.chat__send} onSubmit={handleSend}>
                <input 
                    type="text" 
                    className={classes.chat__input} 
                    name="message" 
                    id="message" 
                    placeholder="Write Something"
                    value={message} 
                    onChange={handleChange}
                    />
                <button type="submit" className={classes.btn__send}>
                    <svg className={classes.send__icon}>
                        <use href="imgs/sprite.svg#icon-compass" />
                    </svg>
                </button> 
            </form>
}

export default Sender;