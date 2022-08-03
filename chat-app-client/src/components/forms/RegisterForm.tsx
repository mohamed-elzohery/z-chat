import React, { useState } from 'react';
import classes from './form.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Gender } from '../../types';
import { registerUser } from '../../API/AuthReuests';
import { useNavigate } from 'react-router-dom';
import {name, email, phone, password, gender} from './ValidationAttributes';

const validationSchema = Yup.object({name, email, password, phone, gender});

const RegisterForm = () => {
    const navigate  = useNavigate();
    const [isLoading, setIsloading] = useState(false);

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          phone: '',
          gender: Gender.OTHER,
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
          try{
            setIsloading(true);
            await registerUser({...values});
            navigate('/');
          }catch(err: any){
            if(err.response.status === 400){
                formik.setErrors(err.response.data);
                return;
            }
          }finally{
             setIsloading(false)   
        }
        },
      });
    return <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.form__group}>
                <label className={classes.form__label} htmlFor="name">
                    Name
                </label>
                <input 
                    className={`${classes.form__input} ${formik.errors.name && classes['form__input--err']}`} 
                    type="text" 
                    id="name" 
                    placeholder="Insert your name" 
                    name="name" 
                    onChange={formik.handleChange}
                    value={formik.values.name}
                /> 
                {formik.errors.name && <p className={classes.error__txt}>{formik.errors.name}</p>}
            </div>
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
                {formik.errors.email && <p className={classes.error__txt}>{formik.errors.email}</p>}
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
                {formik.errors.password && <p className={classes.error__txt}>{formik.errors.password}</p>}
            </div>
            <div className={classes.form__group}>
                <label className={classes.form__label} htmlFor="phone">
                    phone
                </label>
                <input 
                    className={`${classes.form__input} ${formik.errors.phone && classes['form__input--err']}`} 
                    type="text" 
                    id="phone" 
                    placeholder="Insert your phone" 
                    name="phone" 
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                /> 
                {formik.errors.phone && <p className={classes.error__txt}>{formik.errors.phone}</p>}
            </div>
            <div className={classes.form__group}>
                    <label className={classes.form__label} htmlFor="gender">
                        Gender
                    </label>
                <div className={classes.genders}>
                    <label>
                    <input type="radio" onChange={formik.handleChange} name="gender" value={Gender.MALE} />
                    Male
                    </label>
                    <label>
                    <input type="radio" onChange={formik.handleChange} name="gender" value={Gender.FEMALE} />
                    Female
                    </label>
                    <label>
                    <input type="radio" onChange={formik.handleChange} name="gender" value={Gender.OTHER} />
                    Other
                    </label>
                </div>
                </div>
                <div className={classes.form__controls}>
                    <button type="submit" className={`btn ${classes.sumbit__btn}`} disabled={isLoading}>Register</button>
                </div>
        </form>
}

export default RegisterForm;