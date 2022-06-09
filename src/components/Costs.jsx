import './Costs.css';

import React from 'react';
import Form from "react-bootstrap/Form";

import { IDelete, IEdit } from "./Icons";
import ModalPopup, { DeleteConfirmForm } from "./ModalPopup";


function CostsForm(props) {
    return (
        <>
            <Form.Group className="mb-3" controlId="categoryCosts">
                <Form.Control type="text" placeholder="Category name" value={ props.category } />
            </Form.Group>

            <Form.Group className="mb-3" controlId="commentICosts">
                <Form.Control type="text" placeholder="Comment" value={ props.comment } />
            </Form.Group>

            <Form.Group className="mb-3" controlId="amountICosts">
                <Form.Control type="text" placeholder="Amount" value={ props.amount } />
            </Form.Group>
        </>
    )
}


class Costs extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='costs-template d-flex flex-column'>

                    <div className='add-form d-flex justify-content-center mb-4'>
                        <div className='form-container col-12'>
                            <div className='table-header mb-2'>Create new Costs item</div>
                            <div className='toggle-content d-flex flex-column'>
                                <ModalPopup buttonTitle='Add' buttonClassName='shadow-none col-12'
                                            modalBody={ <CostsForm /> }
                                            modalTitle='Add new Costs' modalButtonTitle='Create' />
                            </div>
                        </div>
                    </div>

                    <div className='content'>
                        <div className='table-header mb-1'>List of Costs</div>
                        <div className='table-content'>

                            <div className='row g-0 py-2'>
                                <div className='col order-0 title'>Shop</div>
                                <div className='col-md col-12 order-md-1 order-3 ps-lg-0 px-2 comment'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt et dolore magna aliqua.
                                </div>
                                <div className='col-md-2 col-sm-3 col-4 order-md-2 order-1 amount text-danger'>
                                    <span className='sign'>-</span>
                                    <span className='value me-1'>123</span>
                                    <span className='currency'>$</span>
                                </div>
                                <div className='d-flex order-md-3 order-2 w-auto actions'>
                                    <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                                buttonIcon={ <IEdit /> }
                                                modalBody={ <CostsForm category='Shop' comment='...' amount='123' /> }
                                                modalTitle='Edit Item' modalButtonTitle='Save' />
                                    <ModalPopup buttonVariant='outline-danger' buttonClassName='shadow-none'
                                                buttonIcon={ <IDelete /> }
                                                modalBody={ <DeleteConfirmForm />} modalSize='sm'
                                                modalTitle='Delete Item' modalButtonTitle='Confirm' />
                                </div>
                            </div>

                            <div className='row g-0 py-2'>
                                <div className='col order-0 title'>Restaurant</div>
                                <div className='col-md col-12 order-md-1 order-3 ps-lg-0 px-2 comment'>
                                    Lorem ipsum dolor sit amet.
                                </div>
                                <div className='col-md-2 col-sm-3 col-4 order-md-2 order-1 amount text-danger'>
                                    <span className='sign'>-</span>
                                    <span className='value me-1'>123</span>
                                    <span className='currency'>$</span>
                                </div>
                                <div className='d-flex order-md-3 order-2 w-auto actions'>
                                    <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                                buttonIcon={ <IEdit /> }
                                                modalBody={ <CostsForm category='Restaurant' comment='...' amount='123' /> }
                                                modalTitle='Edit Item' modalButtonTitle='Save' />
                                    <ModalPopup buttonVariant='outline-danger' buttonClassName='shadow-none'
                                                buttonIcon={ <IDelete /> }
                                                modalBody={ <DeleteConfirmForm />} modalSize='sm'
                                                modalTitle='Delete Item' modalButtonTitle='Confirm' />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Costs;