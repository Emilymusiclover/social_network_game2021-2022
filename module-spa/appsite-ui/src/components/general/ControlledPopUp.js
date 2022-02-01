/**
 * src: https://react-popup.elazizi.com/controlled-popup
 */

import React, {useState} from 'react';
import TermsAndConditions from '../users/TermsAndConditions'
import Popup from 'reactjs-popup';

const ControlledPopup = () => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <>
            <label htmlFor="Terms">
                <h4>I've read and agree <a className="underline" onClick={() => setOpen(o => !o)}>
                    Terms and Conditions</a>
                </h4>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal">
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                        <TermsAndConditions></TermsAndConditions>
                    </div>
                </Popup>
            </label>
        </>
    );
};

export default ControlledPopup;