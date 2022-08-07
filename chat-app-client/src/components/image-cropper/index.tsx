import React, { useEffect, useRef, useState, useCallback } from "react";
import { BiCrop } from "react-icons/bi";
import ReactCrop, {Crop} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "../../UI/modal";
import Spinner from "../Spinner";
import classes from './ImageCropper.module.css';


export interface ImageCropperProps{
  srcImage: string;
  onReset: () => void,
  onSumbit: (image: File) => void,
  isLoading: boolean
};


const ImageCropper: React.FC<ImageCropperProps> = ({srcImage, onReset, onSumbit, isLoading}) => {
  // const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);


    const [crop, setCrop] = useState<Crop>({
        unit: 'px', // Can be 'px' or '%'
        x: 100,
        y: 100,
        width: 300,
        height: 300
      });

      
      const dataURLtoFile = (dataurl: string, filename: string) => {
        let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
            
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, {type:mime});
    setCroppedImage(croppedImage);
      };


const getCroppedImg = useCallback( (image: HTMLImageElement, crop: Crop) => {
  const canvas = document.createElement("canvas")!;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  
  ctx?.drawImage(
    image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
   )
   
  const reader = new FileReader()
  canvas.toBlob(blob => {
    if(blob){
      console.log(blob.type);
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
            dataURLtoFile(reader.result as string, 'cropped.jpg');
        }
    }
  }, "image/jpg", 1)
}, []);

  const completeCropping = () => {
    getCroppedImg(imgRef.current!, crop);
  }

useEffect(() => {
  if(imgRef.current){
    getCroppedImg(imgRef.current, crop);
  }
}, [getCroppedImg, crop]);

      const closeCropper = () => onReset();
      
      return <Modal closeModal={closeCropper}>
              <div className={classes.header}>
                <p className={classes.header__txt}>Drag to crop</p>
                <BiCrop size={16} color={"#CC562B"} />
              </div>
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                // circularCrop={true}
                // ruleOfThirds={true}
                onComplete={completeCropping}
                minWidth={300}
                minHeight={300}
                maxHeight={600}
                maxWidth={600}
                aspect={1/1}
                >
                <img ref={imgRef} src={srcImage} alt="profile" className={classes.img} onClick={e => e.preventDefault()}/>
              </ReactCrop>
                <div className={classes.form__controls}>
                {isLoading ? <Spinner /> : <>
                    <button disabled={isLoading} type="button" onClick={onReset} className={`btn ${classes['btn--cancel']}`}>Cancel</button>
                    <button disabled={isLoading} type="button" onClick={onSumbit.bind(this, croppedImage!)} className={`btn ${classes['btn--save']}`}>Save</button>
                </>}
                </div>
            </Modal>
}


export default ImageCropper;
