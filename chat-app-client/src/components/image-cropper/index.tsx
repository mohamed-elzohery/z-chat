import React, { useState } from "react";
import plaImage from '../LogoBox/logo.svg';
import ReactCrop, {Crop} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = () => {
    const [crop, setCrop] = useState<Crop>({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
      });
      
      return <ReactCrop crop={crop} onChange={c => setCrop(c)}>
        <img src={plaImage} alt="testing" />
      </ReactCrop>
}


export default ImageCropper;
