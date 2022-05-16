import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={classes.modal} onClick={onClose}></div>;
};

const Overlay = (props) => {
  const cssClasses = `${classes.overlay} ${
    props.show === "entering"
      ? classes.openMenu
      : props.show === "exiting"
      ? classes.closeMenu
      : null
  }`;

  return <div className={cssClasses}>{props.content}</div>;
};

const Modal = (props) => {
  return ReactDOM.createPortal(
    <Fragment>
      <Backdrop onClose={props.closed} />
      <Overlay content={props.content} show={props.show} />
    </Fragment>,
    document.getElementById("modal")
  );
};

export default Modal;
