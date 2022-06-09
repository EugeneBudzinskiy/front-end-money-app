import './Income.css';

import React from 'react';
import Form from "react-bootstrap/Form";

import { IDelete, IEdit } from "./Icons";
import ModalPopup, { DeleteConfirmForm } from "./ModalPopup";


function IncomeForm(props) {
    return (
        <>
            <Form.Group className="mb-3" controlId="sourceIncome">
                <Form.Control type="text" placeholder="Source name" value={ props.source }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="amountIncome">
                <Form.Control type="text" placeholder="Amount" value={ props.amount } />
            </Form.Group>
        </>
    )
}


class Income extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='income-template d-flex flex-column'>

                    <div className='add-form d-flex justify-content-center mb-4'>
                        <div className='form-container col-12'>
                            <div className='table-header mb-2'>Create new Income item</div>
                            <div className='toggle-content d-flex flex-column'>
                                <ModalPopup buttonTitle='Add' buttonClassName='shadow-none col-12'
                                            modalBody={ <IncomeForm /> }
                                            modalTitle='Add new Income' modalButtonTitle='Create' />
                            </div>
                        </div>
                    </div>

                    <div className='content'>
                        <div className='table-header mb-1'>List of incomes</div>
                        <div className='table-content'>

                            <div className='row g-0 py-2'>
                                <div className='col title'>Savings</div>
                                <div className='col-lg-2 col-sm-3 col-4 amount text-success'>
                                    <span className='sign'>+</span>
                                    <span className='value me-1'>123</span>
                                    <span className='currency'>$</span>
                                </div>
                                <div className='d-flex w-auto actions'>
                                    <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                                buttonIcon={ <IEdit /> }
                                                modalBody={ <IncomeForm source='Savings' amount='123' /> }
                                                modalTitle='Edit Item' modalButtonTitle='Save' />
                                    <ModalPopup buttonVariant='outline-danger' buttonClassName='shadow-none'
                                                buttonIcon={ <IDelete /> }
                                                modalBody={ <DeleteConfirmForm />} modalSize='sm'
                                                modalTitle='Delete Item' modalButtonTitle='Confirm' />
                                </div>
                            </div>

                            <div className='row g-0 py-2'>
                                <div className='col title'>Work</div>
                                <div className='col-lg-2 col-sm-3 col-4 amount text-success'>
                                    <span className='sign'>+</span>
                                    <span className='value me-1'>123</span>
                                    <span className='currency'>$</span>
                                </div>
                                <div className='d-flex w-auto actions'>
                                    <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                                buttonIcon={ <IEdit /> }
                                                modalBody={ <IncomeForm source='Work' amount='123' /> }
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
export default Income;