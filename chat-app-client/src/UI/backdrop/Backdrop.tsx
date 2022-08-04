import React from 'react';
import classes from './Backdrop.module.css';
import { createPortal } from 'react-dom';
import { ModalContentProps } from '../modal';

const BackdropRoot = document.getElementById('backdrop')!;

interface BackdropProps extends ModalContentProps{
    onClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
    return <>{createPortal(<div onClick={props.onClickHandler} className={classes.backdrop}></div>, BackdropRoot)}</>;
}

export default Backdrop;