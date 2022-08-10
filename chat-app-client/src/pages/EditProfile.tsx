import React from 'react';
import classes from './editProfile.module.css';
import * as Yup from 'yup';
import EditForm from '../components/forms/EditForm';
import { FormikValues } from 'formik';
import { name as NameValidation, status as StatusValidation } from '../components/forms/ValidationAttributes';
import {BiArrowBack} from 'react-icons/bi';
import IconButton from '../UI/buttons/IconButton';
import { UIActions } from '../slices/UISlice';
import ImageForm from '../components/forms/ImageForm';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { updateName, updateStatus } from '../API/UserRequest';
import { UserActions } from '../slices/UserSlice';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';


const EditProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.User);


    const sumbitName = async (attr: FormikValues) => {
        try{
            await updateName(attr.name);
            dispatch(UserActions.updateUserName(attr.name));
            toast.success("Name is updated successfully");
        }catch(err){
            toast.error("failed updating name");
        }
    }  
    
    const sumbitStatus = async (attr: FormikValues) => {
        try{
            await updateStatus(attr.status);
            dispatch(UserActions.updateUserStatus(attr.status));
            toast.success("Name is updated successfully");
        }catch(err){
            toast.error("Name is updated successfully");
        }
    }  

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(UIActions.closeProfileEditor());
    }


    return  <div 
            className={classes.container}>
            <div className={classes.header} >
                <IconButton styles={classes} handleClick={handleClick}>
                    <BiArrowBack size={20} />    
                </IconButton> 
            </div>
            <h2 className='heading-2'>Profile</h2>
            <ImageForm />
            <motion.div 
                className={classes.forms__container}
                initial={{y:-30, opacity: 0}}
                animate={{y:0, opacity: 1}}
                transition={{delay: .35, duration: .2}}
            >
            <EditForm 
                value={userData.name}
                label='your name'
                handleSumbit={sumbitName}
                attribute='name'
                validationSchema={Yup.object({name: NameValidation})}
                />

            <EditForm 
                value={userData.status}
                label='status'
                handleSumbit={sumbitStatus}
                attribute='status'
                validationSchema={Yup.object({status: StatusValidation})}
                />
            </motion.div>
        </div>
}

export default EditProfile;