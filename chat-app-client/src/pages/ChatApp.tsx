import React from 'react';
import Aside from '../layout/aside/Aside';
import Main from '../layout/main/Main';
import {ToastContainer, Zoom} from 'react-toastify';

const ChatApp = () => {
    return  <div className='chat-app'>
              <Aside />
              <Main />  
              <ToastContainer theme='dark' style={{fontSize: '1.6rem', width: '30rem'}} transition={Zoom} position='bottom-left' hideProgressBar={true} />
            </div>
            
}

export default ChatApp;