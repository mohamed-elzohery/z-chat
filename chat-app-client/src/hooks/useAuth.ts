import {useEffect, useState} from 'react';
import { getCurrentUser } from '../API/AuthReuests';
import { UserActions } from '../slices/UserSlice';
import { useAppDispatch } from './app';
import {UserSliceType} from '../slices/UserSlice';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            const user = res.data.data.currentUser as UserSliceType;
            if(user){
                setIsLoggedIn(true);
                dispatch(UserActions.getUserData({
                    name: user.name, 
                    status: user.status, 
                    photo: process.env.REACT_APP_AWS_DOMAIN + user.photo, 
                    _id: user._id
                }));
            };
        })
        .catch(console.log)
        .finally(() => setIsChecking(false))
    }, [dispatch]);

    return {isLoggedIn, isChecking};
};

export default useAuth;