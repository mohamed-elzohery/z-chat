import React, { useState, useRef } from 'react';
import { FormikValues, useFormik } from 'formik';
import classes from './form.module.css';
import {AiOutlineCheck} from 'react-icons/ai';
import {MdModeEditOutline} from 'react-icons/md'

export interface EditFormProps{
    label: string,
    attribute: string;
    value: string,
    validationSchema: any,
    handleSumbit: (attr: FormikValues) => void;
}

const EditForm: React.FC<EditFormProps> = ({attribute, value, handleSumbit, validationSchema, label}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const input = useRef<HTMLInputElement>(null);

    const formik = useFormik({
        initialValues: {[attribute]: value},
        validationSchema,
        validateOnBlur: false,
        validateOnChange: true,
        onSubmit: (values) => {
            setIsEditing(false);
            handleSumbit(values);
        },
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(isEditing && formik.errors[attribute]) return;
        input.current!.focus();
        setIsEditing(prev => !prev);
    };
      

    return <form onSubmit={formik.handleSubmit} className={classes.edit__form}>
            <div className={classes.edit__group}>
                <label htmlFor={attribute} className={classes.edit__label}>{label}</label>
                <div className={classes.inputGroup}>
                    <input 
                        id={attribute} 
                        name={attribute} 
                        value={formik.values[attribute]} 
                        className={`${classes.edit__input} ${formik.errors[attribute] && classes['edit__input--err']}`} 
                        type="text" 
                        readOnly={!isEditing}
                        onChange={formik.handleChange}
                        ref={input}
                    />
                    <button 
                        className={classes.btn}
                        onClick={handleClick}
                        type={isEditing ? "button" : "submit"}
                    >
                            {isEditing ? <AiOutlineCheck size={16}/> : <MdModeEditOutline size={16}/>}
                    </button>
                </div>
                    {formik.errors[attribute] && <p className={classes.error__txt}>
                    {formik.errors[attribute]}
                    </p>}
            </div>
            </form>
}

export default EditForm;
