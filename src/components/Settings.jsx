import './Settings.css';

import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class Settings extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='content settings-template'>

                    <div className='content-block mb-4 pb-4'>
                        <div className='table-header mb-1'>Change password</div>
                        <div className='form-container col-12'>
                            <Form>
                                <div className='d-flex flex-md-row flex-column py-2
                                                justify-content-center align-items-center '>
                                    <Form.Group className="col-xl-3 col-md-4 col-sm-6 col-8 mx-2 mx-xl-3"
                                                controlId="changePassword">
                                        <Form.Control type="password" placeholder="New password" />
                                    </Form.Group>

                                    <Form.Group className="col-xl-3 col-md-4 col-sm-6 col-8 mx-2 mx-xl-3 my-md-0 my-3 "
                                                controlId="changePasswordConfirmation">
                                        <Form.Control type="password" placeholder="Repeat new password" />
                                    </Form.Group>

                                    <Button type="submit" className='col-md-2 col-sm-3 col-4 mx-xl-3 mx-2'>Change</Button>

                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className='content-block mb-4 pb-4'>
                        <div className='table-header mb-1'>Change currency</div>
                        <div className='form-container col-12'>
                            <Form>
                                <div className='d-flex justify-content-center py-2'>
                                    <Form.Group className="col-xl-2 col-md-3 col-sm-4 col-5 mx-xl-3 mx-2"
                                                controlId="changeCurrency">
                                        <Form.Control type="text" placeholder="Currency" />
                                    </Form.Group>

                                    <Button type="submit" className='col-xl-2 col-md-2 col-sm-3 col-4 mx-xl-3 mx-2'>
                                        Change
                                    </Button>

                                </div>
                            </Form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Settings;