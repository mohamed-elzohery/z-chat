import React from 'react';
import classes from './sign.module.css';
import { Link } from 'react-router-dom';
import logoImage from './logo.svg';
import galleryImg from './login2.jpg'
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {
    return <div className={classes.login}>
    <div className={classes.login__box}>
        <div className={classes.container}>
            <div className={classes.logo}>
                <img src={logoImage} alt="z-logo" className={classes.logo__img} />
                <h1 className={classes.logo__txt}>Chat</h1>
            </div>
            <h1 className={`heading-1 ${classes.login__title}`}>Register</h1>
            <RegisterForm />
            <p className={classes['have-account']}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    </div>
    <div className={classes.login__gallery}>
        <img src={galleryImg} alt="login natural view" className={classes.login__img} />
    </div>
</div>
}

export default Register;