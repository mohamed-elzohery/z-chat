import React from 'react';
import classes from './sign.module.css';
import { Link } from 'react-router-dom';
import galleryImg from './login2.jpg'
import RegisterForm from '../components/forms/RegisterForm';
import LogoBox from '../components/LogoBox/LogoBox';

const Register = () => {
    return <div className={classes.login}>
    <div className={classes.login__box}>
        <div className={classes.container}>
            <LogoBox />
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