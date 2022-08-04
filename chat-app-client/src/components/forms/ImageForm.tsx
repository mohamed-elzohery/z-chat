import React, {useRef, useState} from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import ProfileImage from '../contacts/contact3.jpg';
import { UIActions } from '../../slices/UISlice';


import classes from './form.module.css';
import ImageCropper from '../image-cropper';

const ImageForm = () => {
    const [img, setImg] = useState(ProfileImage);
    const [croppedImage, setCroppedImage] = useState();
    const refForm = useRef<HTMLFormElement | null>(null);
    const isCropperOpen = useAppSelector(state => state.UI.isCropperOpen);
    const dispatch = useAppDispatch();

    const onReset = () => {
        dispatch(UIActions.closeCropper());
        refForm.current?.reset();
    };

    const onSumbit = () => {
        console.log("image sumbitted");
    }

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        dispatch(UIActions.openCropper());
        setImg(URL.createObjectURL(file));
    };

    return  <form onSubmit={(e:React.FormEvent) => e.preventDefault()} ref={refForm}>
                <div className={classes.img__Box}>
                    <img src={ProfileImage} alt="profile" className={classes.img} />
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
                        onChange={onImageChange} />
                </div> 
                {isCropperOpen && <ImageCropper 
                                     srcImage={img}
                                     onReset={onReset}
                                     onSumbit={onSumbit}
                                     />}
            </form>
}

export default ImageForm;