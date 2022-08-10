import React, {useRef, useState} from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import { UIActions } from '../../slices/UISlice';


import classes from './form.module.css';
import ImageCropper from '../image-cropper';
import axios from 'axios';
import { updatePhoto } from '../../API/UserRequest';
import { UserActions } from '../../slices/UserSlice';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';



const ImageForm: React.FC = () => {
    
    const photo = useAppSelector(state => state.User.photo);
    const [img, setImg] = useState(photo);
    const [isLoading, setIsLoading] = useState(false);

    const refForm = useRef<HTMLFormElement | null>(null);
    const isCropperOpen = useAppSelector(state => state.UI.isCropperOpen);
    const dispatch = useAppDispatch();

    const onReset = () => {
        dispatch(UIActions.closeCropper());
        refForm.current?.reset();
    };

    const onSumbit = async (image: File) => {
        try{
            setIsLoading(true);
            axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:4000/api/v1/upload');
            axios.defaults.withCredentials = false;
            await axios.put(res.data.url, image, {headers: {'Content-Type': image.type}});
            await updatePhoto(res.data.Key);
            dispatch(UserActions.updateUserPhoto(res.data.Key));
            toast.success('Photo updated successfully');
        }catch(err){
            toast.error('Failed updating photo.');
        }finally{
            setIsLoading(false);
            dispatch(UIActions.closeCropper());
        }
    }

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        dispatch(UIActions.openCropper());
        setImg(URL.createObjectURL(file));
    };

    return  <motion.form 
                transition={{delay: .15, duration: .25}}
                initial={{scale: 0, opacity: .3}}
                animate={{scale: 1, opacity: 1}}
                onSubmit={(e:React.FormEvent) => e.preventDefault()} 
                ref={refForm}>
                <div className={classes.img__Box}>
                    <img src={photo} alt="profile" className={classes.img} />
                    <div className={classes.img__ovrlay}>
                        <AiFillCamera size={30} className={classes.ovrlay__icon} />
                        <p className={classes.ovrlay__txt}>Change Photo</p>
                    </div>
                    <input 
                        className={classes.image__input}
                        type="file"
                        accept="image/*"
                        name="image"
                        id="file"
                        onChange={onImageChange}
                        />
                </div> 
                {isCropperOpen && <ImageCropper 
                                     srcImage={img}
                                     onReset={onReset}
                                     onSumbit={onSumbit}
                                     isLoading={isLoading}
                                     />}
            </motion.form>
}

export default ImageForm;