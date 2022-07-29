import React from 'react';
import Aside from './layout/aside/Aside';
import Header from './layout/header/Header';
import ContactImage from './components/contacts/contact2.jpg';

function App() {
  return <>
    <Aside />
    <main className="main">
        <Header name='John Due' isOnline={true} contactImage={ContactImage} />
        <div className="chat__area">
            <div className="chat__date">
                Today
            </div>
            <div className="msg msg--user">
                <p className="msg__body">
                    Hello Omar How are you sdcsdcsd csdcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                </p>
                <span className="msg__date">
                    02:44 AM
                </span>
            </div>
            <div className="msg msg--contact">
                <p className="msg__body">
                    Hello Mohamed I am fine
                </p>
                <span className="msg__date">
                    02:45 AM
                </span>
            </div>
            <div className="msg msg--user">
                <p className="msg__body">
                    Hello Omar How are you sdcsdcsd csdcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                </p>
                <span className="msg__date">
                    02:44 AM
                </span>
            </div>
            <div className="msg msg--contact">
                <p className="msg__body">
                    Hello Mohamed I am fine
                </p>
                <span className="msg__date">
                    02:45 AM
                </span>
            </div>
            <div className="msg msg--user">
                <p className="msg__body">
                    Hello Omar How are you sdcsdcsd csdcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                </p>
                <span className="msg__date">
                    02:44 AM
                </span>
            </div>
            <div className="msg msg--contact">
                <p className="msg__body">
                    Hello Mohamed I am fine
                </p>
                <span className="msg__date">
                    02:45 AM
                </span>
            </div>
            <div className="msg msg--user">
                <p className="msg__body">
                    Hello Omar How are you sdcsdcsd csdcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                </p>
                <span className="msg__date">
                    02:44 AM
                </span>
            </div>
            <div className="msg msg--contact">
                <p className="msg__body">
                    Hello Mohamed I am fine
                </p>
                <span className="msg__date">
                    02:45 AM
                </span>
            </div>
            <div className="msg msg--user">
                <p className="msg__body">
                    Hello Omar How are you sdcsdcsd csdcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                </p>
                <span className="msg__date">
                    02:44 AM
                </span>
            </div>
            <div className="msg msg--contact">
                <p className="msg__body">
                    Hello Mohamed I am fine
                </p>
                <span className="msg__date">
                    02:45 AM
                </span>
            </div>
            <div className="msg msg--user">
                <p className="msg__body">
                    Hello Omar How are you sdcsdcsd csdcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                </p>
                <span className="msg__date">
                    02:44 AM
                </span>
            </div>
            <div className="msg msg--contact">
                <p className="msg__body">
                    Hello Mohamed I am fine
                </p>
                <span className="msg__date">
                    02:45 AM
                </span>
            </div>
        </div>
        <form className="chat__send">
            <input type="text" className="chat__input" name="message" id="message" placeholder="Write Something" />
            <button type="submit" className="btn__send">
                <svg className="send__icon">
                    <use href="imgs/sprite.svg#icon-compass" />
                </svg>
            </button> 
        </form>
    </main>
    </>
}

export default App;
