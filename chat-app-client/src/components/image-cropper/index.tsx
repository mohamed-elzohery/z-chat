import React, { useRef, useState } from "react";
import { BiCrop } from "react-icons/bi";
import ReactCrop, {Crop} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useAppDispatch } from "../../hooks/app";
import { UIActions } from "../../slices/UISlice";
import Modal from "../../UI/modal";
import classes from './ImageCropper.module.css';

export interface ImageCropperProps{
  srcImage: string;
  onReset: () => void,
  onSumbit: () => void,
};


const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
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
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
          this.dataURLtoFile(reader.result, 'cropped.jpg')
      }
  })
}


const ImageCropper: React.FC<ImageCropperProps> = ({srcImage, onReset, onSumbit}) => {

  const imgRef = useRef<HTMLImageElement | null>(null);

    const dispatch = useAppDispatch();

    const [crop, setCrop] = useState<Crop>({
        unit: 'px', // Can be 'px' or '%'
        x: 100,
        y: 100,
        width: 300,
        height: 300
      });

    // const completeCropping = (crop: Crop) => {
    //   if(imgRef) {
        
    //       const croppedImageUrl = getCroppedImg(imgRef, crop);
    //       setState({ croppedImageUrl })
      
    //   }
    // }


      const closeCropper = () => dispatch(UIActions.closeCropper());
      
      return <Modal closeModal={closeCropper}>
              <div className={classes.header}>
                <p className={classes.header__txt}>Drag to crop</p>
                <BiCrop size={16} color={"#CC562B"} />
              </div>
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                locked={true}
                circularCrop={true}
                // onComplete={completeCropping}
                >
                <img ref={imgRef} src={srcImage} alt="profile" className={classes.img}/>
              </ReactCrop>
              <div className={classes.form__controls}>
                    <button onClick={onReset} className={`btn ${classes['btn--cancel']}`}>Cancel</button>
                    <button onClick={onSumbit} className={`btn ${classes['btn--save']}`}>Save</button>
                </div>
            </Modal>
}


export default ImageCropper;
