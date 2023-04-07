import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = (props) => {
    const clickHandler = (e) => {
        if (e.target.classList.contains("modal")) {
            props.hideFunc();
        }
    };
    const modalContent = (
        <div className="modal" onClick={clickHandler}>
            <div className="card card-modal">
                <button className="modal-icon" onClick={props.hideFunc}>
                    X
                </button>
                <h3 className="modal-heading">{props.heading}</h3>
                <p className="modal-info">{props.info}</p>
                <button className="btn-action" onClick={props.btnFunc}>
                    {props.btnContent}
                </button>
            </div>
        </div>
    );

    return createPortal(modalContent, document.getElementById("modal"));
};

export default Modal;
