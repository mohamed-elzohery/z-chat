import * as Yup from 'yup';

import { Gender } from '../../types';

export const name =  Yup.string()
        .max(30, 'Name must be 30 characters or less')
        .required('Name is required')
        .min(2, "Name must be at least 2 characters")
        .matches(/^[a-zA-Z](?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/, "Invalid name");

export const status =  Yup.string()
        .max(100, 'status must be 100 characters or less')
        .default("I am using Z chat");

export const password = Yup.string()
        .min(8, 'Password must be 8 characters or more')
        .required('Password is required')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "password must be at least one letter, one number and one special character");

export const email = Yup.string().trim().lowercase()
        .email('Invalid email address').required('Email is required');

export const phone = Yup.string().trim()
        .required("Phone is required")
        // eslint-disable-next-line no-useless-escape
        .matches(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/, "Invalid phone number");

export const gender = Yup.string().default(Gender.OTHER)


