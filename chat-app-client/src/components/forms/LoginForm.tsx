import React, { useState } from 'react';
import classes from './form.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../API/AuthReuests';
import { useNavigate } from 'react-router-dom';

import {email, password} from './ValidationAttributes';

const validationSchema = Yup.object({email, password});

const LoginForm = () => {
    const navigate  = useNavigate();
    const [isLoading, setIsloading] = useState(false);

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
          try{
            setIsloading(true);
            await loginUser({...values});
            navigate('/');
          }catch(err: any){
            if(err.response.status === 400){
                formik.setErrors({email: err.response.data});
                return;
            }
          }finally{
             setIsloading(false)   
        }
        },
      });
    return <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.form__group}>
                <label className={classes.form__label} htmlFor="email">
                    Email
                </label>
                <input 
                    className={`${classes.form__input} ${formik.errors.email && classes['form__input--err']}`} 
                    type="text" 
                    id="email" 
                    placeholder="Insert your email" 
                    name="email" 
                    onChange={formik.handleChange}
                    value={formik.values.email}
                /> 
            </div>
            <div className={classes.form__group}>
                <label className={classes.form__label} htmlFor="password">
                    Password
                </label>
                <input 
                    className={`${classes.form__input} ${formik.errors.email && classes['form__input--err']}`} 
                    type="password" 
                    id="password" 
                    placeholder="Insert your password" 
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                /> 
            </div>

                {(formik.errors.email === "Enter email and password." 
                || formik.errors.password === "Enter email and password." )
                ? <p className={classes.error__txt}>
                    Enter email and password.
                </p> : ((formik.errors.email === "Invalid email or password." 
                || formik.errors.password === "Invalid email or password." )
                && <p className={classes.error__txt}>
                    Invalid email or password.
                </p>)}

                {}

                <div className={classes.form__controls}>
                    <button type="submit"  className={`btn ${classes.sumbit__btn}`} disabled={isLoading}>Login</button>
                </div>
        </form>
}

export default LoginForm;