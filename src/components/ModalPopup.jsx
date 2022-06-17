import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function DeleteConfirmForm() {
    return (
        <div>Are you sure?<br></br>Please confirm this action.</div>
    )
}


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
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>{ props.modalTitle }</Modal.Title>
                </Modal.Header>

                <Form>
                    {props.modalForm(handleHide)}
                </Form>

            </Modal>

        </div>
    );

}
export default ModalPopup;
export { DeleteConfirmForm };