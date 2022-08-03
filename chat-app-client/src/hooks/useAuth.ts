import {useEffect, useState} from 'react';
import { getCurrentUser } from '../API/AuthReuests';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            if(res.data.data.currentUser) setIsLoggedIn(true);
            console.log(res)
        })
        .catch(err => console.log(err))
        .finally(() => setIsChecking(false))
    }, []);

    return {isLoggedIn, isChecking};
};

export default useAuth;