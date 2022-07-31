import React, { useState } from 'react';
import classes from './Sender.module.css';

const Sender = () => {
    const [message, setMessage] = useState('');

    const handleSend = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }


    return  <form className={classes.chat__send}>
                <input 
                    type="text" 
                    className={classes.chat__input} 
                    name="message" 
                    id="message" 
                    placeholder="Write Something"
                    value={message} 
                    onChange={handleSend}
                    />
                <button type="submit" className={classes.btn__send}>
                    <svg className={classes.send__icon}>
                        <use href="imgs/sprite.svg#icon-compass" />
                    </svg>
                </button> 
            </form>
}

export default Sender;