import React from 'react';
import LogoBox from '../components/LogoBox/LogoBox';

const LoadingPage = () => {
    return <div style={{display: 'flex',flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <LogoBox isLoading={true} />
        <p style={{color: 'black', fontSize: "1.5rem"}}>Loading...</p>
    </div>
}

export default LoadingPage;