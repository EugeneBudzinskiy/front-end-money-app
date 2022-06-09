import './Category.css';

import React from 'react';
import Form from 'react-bootstrap/Form';

import { IDelete, IEdit } from "./Icons";
import ModalPopup, { DeleteConfirmForm } from "./ModalPopup";


function CategoryForm(props) {
    return (
        <>
            <Form.Group className="mb-3" controlId="nameCategory">
                <Form.Control type="text" placeholder="Category name" value={ props.name } />
            </Form.Group>
        </>
    )
}


class Category extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-4'>
                <div className='category-template d-flex flex-column'>

                    <div className='add-form d-flex justify-content-center mb-4'>
                        <div className='form-container col-12'>
                            <div className='table-header mb-2'>Create new Category</div>
                            <div className='toggle-content d-flex flex-column'>
                                <ModalPopup buttonTitle='Add' buttonClassName='shadow-none col-12'
                                            modalBody={ <CategoryForm /> }
                                            modalTitle='Add new Category' modalButtonTitle='Create' />
                            </div>
                        </div>
                    </div>

                    <div className='content'>
                        <div className='table-header mb-1'>List of Categories</div>
                        <div className='table-content'>

                            <div className='row g-0 py-2'>
                                <div className='col title'>Shop</div>
                                <div className='d-flex w-auto actions'>
                                    <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                                buttonIcon={ <IEdit /> }
                                                modalBody={ <CategoryForm name='Shop' /> }
                                                modalTitle='Edit Item' modalButtonTitle='Save' />
                                    <ModalPopup buttonVariant='outline-danger' buttonClassName='shadow-none'
                                                buttonIcon={ <IDelete /> }
                                                modalBody={ <DeleteConfirmForm />} modalSize='sm'
                                                modalTitle='Delete Item' modalButtonTitle='Confirm' />
                                </div>
                            </div>

                            <div className='row g-0 py-2'>
                                <div className='col title'>Restaurant</div>
                                <div className='d-flex w-auto actions'>
                                    <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                                buttonIcon={ <IEdit /> }
                                                modalBody={ <CategoryForm name='Restaurant' /> }
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
export default Category;