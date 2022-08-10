import React, { useEffect } from 'react';
import Aside from '../layout/aside/Aside';
import Main from '../layout/main/Main';
import {ToastContainer, Zoom} from 'react-toastify';
import { useAppDispatch } from '../hooks/app';
import { UserActions } from '../slices/UserSlice';

const ChatApp = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
      dispatch(UserActions.connectToSocket({}));
    },[dispatch])

    return  <div className='chat-app'>
              <Aside />
              <Main />  
              <ToastContainer theme='dark' style={{fontSize: '1.6rem', width: '30rem'}} transition={Zoom} position='bottom-left' hideProgressBar={true} />
            </div>
            
}

export default ChatApp;