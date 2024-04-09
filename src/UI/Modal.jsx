import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, className = '', onClose }){

    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if(open){
            modal.showModal();
        }

        //this cleanup function will be executed when this useEffect function is about to run again
        return () => modal.close();
        
    }, [open]);

    return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
        {children}
        </dialog>, document.getElementById('modal')
    );
}