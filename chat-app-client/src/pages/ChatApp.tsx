import React, { useEffect } from 'react';
import Aside from '../layout/aside/Aside';
import Main from '../layout/main/Main';
import {ToastContainer, Zoom} from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { UserActions } from '../slices/UserSlice';
import {io} from 'socket.io-client';
import { ContactsActions, Message } from '../slices/ContactsSlice';


const ChatApp = () => {
    const dispatch = useAppDispatch();
    const sender = useAppSelector(state => state.Contacts.activeContact?._id);
    
    useEffect(() => {
      const socket = io(process.env.REACT_APP_SOCKET_URL!, { transports : ['websocket', 'polling', 'flashsocket'] });
      console.log(socket.connected);

      socket.on('send-to-contact', (message: Message) => {
          if(!sender || message.sender !== sender){
            dispatch(ContactsActions.recieveMessageInactive({message}));
          }
      });

      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

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