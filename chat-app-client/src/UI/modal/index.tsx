import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "../backdrop/Backdrop";
import classes from "./Modal.module.css";

const overlay = document.getElementById("overlay")!;

export type ModalContentProps = {
    children?: JSX.Element | JSX.Element[],
};

export type ModalProps = {
    children?: JSX.Element | JSX.Element[],
    closeModal: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ModalContent: React.FC<ModalContentProps> = (props) => {
  return <div className={classes["modal-body"]}>{props.children}</div>;
};

const Modal: React.FC<ModalProps> = ({closeModal, children}) => {

  return (
    <>
      <Backdrop onClickHandler={closeModal} />
      {createPortal(<ModalContent>{children}</ModalContent>, overlay)}
    </>
  );
};

export default Modal;