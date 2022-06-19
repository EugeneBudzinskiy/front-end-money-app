import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



function ModalPopup(props) {
    const [showFlag, setShowFlag] = useState(false);

    const handleHide = () => setShowFlag(false);
    const handleShow = () => setShowFlag(true);

    return (
        <div className="popup-container">

            <Button variant={ props.buttonVariant } className={ props.buttonClassName } onClick={ handleShow }>
                { props.buttonIcon }<span>{ props.buttonTitle }</span>
            </Button>

            <Modal size={ props.modalSize } centered show={ showFlag } onHide={ handleHide }>

                <Form>
                    {props.modalForm({handleHide: handleHide, data: props.data})}
                </Form>

            </Modal>

        </div>
    );

}
export default ModalPopup;