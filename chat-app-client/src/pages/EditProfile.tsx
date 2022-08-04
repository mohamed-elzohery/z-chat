import React from 'react';
import classes from './editProfile.module.css';
import * as Yup from 'yup';
import EditForm from '../components/forms/EditForm';
import { FormikValues } from 'formik';
import { name as NameValidation, status as StatusValidation } from '../components/forms/ValidationAttributes';
import {BiArrowBack} from 'react-icons/bi';
import IconButton from '../UI/buttons/IconButton';
import { useDispatch } from 'react-redux';
import { UIActions } from '../slices/UISlice';
import ImageForm from '../components/forms/ImageForm';
export interface EditProfileProps{
    name: string;
    status: string; 
    imgUrl: string;
}


const EditProfile: React.FC<EditProfileProps> = ({name = "mohamed elzohery", status, imgUrl}) => {
    const dispatch = useDispatch();

    const sumbitName = (attr: FormikValues) => {
        console.log(attr);
    }  
    
    const sumbitStatus = (attr: FormikValues) => {
        console.log(attr);
    }  

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(UIActions.closeProfileEditor());
    }


    return <div className={classes.container}>
        <div className={classes.header} >
            <IconButton styles={classes} handleClick={handleClick}>
                <BiArrowBack size={20} />    
            </IconButton> 
        </div>
        <h2 className='heading-2'>Profile</h2>
        <ImageForm />
        <div className={classes.forms__container}>
        <EditForm 
            value={name}
            label='your name'
            handleSumbit={sumbitName}
            attribute='name'
            validationSchema={Yup.object({name: NameValidation})}
            />

        <EditForm 
            value={status}
            label='status'
            handleSumbit={sumbitStatus}
            attribute='status'
            validationSchema={Yup.object({status: StatusValidation})}
            />
        </div>
    </div>
}

export default EditProfile;