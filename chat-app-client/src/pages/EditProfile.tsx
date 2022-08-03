import React, {useState} from 'react';
import ReactCrop, {Crop} from 'react-image-crop';
import ImageCropper from '../components/image-cropper';
import classes from './editProfile.module.css';
import * as Yup from 'yup';
import {  AiFillCamera } from 'react-icons/ai'
import ProfileImage from '../components/contacts/contact3.jpg';
import EditForm from '../components/forms/EditForm';
import { FormikValues } from 'formik';
import { name as NameValidation, status as StatusValidation } from '../components/forms/ValidationAttributes';

export interface EditProfileProps{
    name: string;
    status: string; 
    imgUrl: string;
}


const EditProfile: React.FC<EditProfileProps> = ({name = "mohamed elzohery", status, imgUrl}) => {
    // const [username, setName] = useState(name);
    // const [iserStatus, setStatus] = useState(status);

    // const [isEditingName, setIsEditingName] = useState(false);
    // const [IsEditingStatus, setIsEditingStatus] = useState(false);

    // const handleClickName = (e: React.MouseEvent<HTMLButtonElement>) => setIsEditingName(prev => !prev);
    


    const sumbitName = (attr: FormikValues) => {
        console.log(attr);
    }  
    
    const sumbitStatus = (attr: FormikValues) => {
        console.log(attr);
    }  


    return <div className={classes.container}>
        <div className={classes.img__Box}>
            <img src={ProfileImage} alt="profile" className={classes.img} />
            <div className={classes.img__ovrlay}>
                <AiFillCamera size={30} className={classes.ovrlay__icon} />
                <p className={classes.ovrlay__txt}>Change Photo</p>
            </div>
        </div>
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
}

export default EditProfile;