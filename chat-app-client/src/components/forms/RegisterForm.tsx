import React from 'react';
import classes from './form.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export enum Gender{
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

const validationSchema = Yup.object({
    name: Yup.string().trim()
      .max(15, 'Must be 15 characters or less')
      .required('Name is required')
      .min(2, "Name must be at least 2 characters")
      .matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/, "Invalid name"),
    password: Yup.string()
      .min(8, 'Must be 8 characters or more')
      .required('Password is required')
      .max(30, "Password must be 30 characters or less")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "password must be at least one letter, one number and one special character"),
    email: Yup.string().trim().lowercase().email('Invalid email address').required('Email is required'),
    phone: Yup.string().trim()
            .required("Phone is required")
            .matches(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/, "Invalid phone number"),
    gender: Yup.string().default(Gender.OTHER)
  });

const RegisterForm = () => {
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          phone: '',
          gender: '',
        },
        validationSchema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    return <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.form__group}>
                <label className={classes.form__label} htmlFor="name">
                    Name
                </label>
                <input 
                    className={`${classes.form__input} ${formik.values.name && classes['form__input--err']}`} 
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
                    className={`${classes.form__input} ${formik.values.email && classes['form__input--err']}`} 
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
                    className={`${classes.form__input} ${formik.values.email && classes['form__input--err']}`} 
                    type="text" 
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
                    className={`${classes.form__input} ${formik.values.phone && classes['form__input--err']}`} 
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
                    <input type="radio" name="gender" value={Gender.MALE} />
                    Male
                    </label>
                    <label>
                    <input type="radio" name="gender" value={Gender.FEMALE} />
                    Female
                    </label>
                    <label>
                    <input type="radio" name="gender" value={Gender.OTHER} checked />
                    Other
                    </label>
                </div>
                </div>
                <div className={classes.form__controls}>
                    <button className={`btn ${classes.sumbit__btn}`}>Register</button>
                </div>
        </form>
}

export default RegisterForm;