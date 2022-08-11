import React, { useEffect } from 'react';
import Aside from '../layout/aside/Aside';
import Main from '../layout/main/Main';
import {ToastContainer, Zoom} from 'react-toastify';
import { useAppDispatch } from '../hooks/app';
import { UserActions } from '../slices/UserSlice';
import {io} from 'socket.io-client';


const ChatApp = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
      const socket = io(process.env.REACT_APP_SOCKET_URL!, { transports : ['websocket', 'polling', 'flashsocket'] });
      socket.on('send-to-contact', message => console.log(message));
      dispatch(UserActions.connectToSocket(socket));
      return () => {socket.disconnect()}
    },[dispatch])

    return  <div className='chat-app'>
              <Aside />
              <Main />  
              <ToastContainer theme='dark' style={{fontSize: '1.6rem', width: '30rem'}} transition={Zoom} position='bottom-left' hideProgressBar={true} />
            </div>
            
}

export default ChatApp;