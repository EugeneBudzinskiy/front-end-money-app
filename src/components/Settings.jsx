import './Settings.css';

import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useApi} from "../utilites/ApiProvider.tsx";
import {NotificationManager} from "react-notifications";

const ChangePasswordView = () => {
    const api = useApi()
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    const onSubmit = () => {
        if (password !== passwordConfirmation) {
            NotificationManager.error("Password and Password Confirmation should match", "Password Error")
        } else if (password.length < 6)
        {
            NotificationManager.error("Password should have more then or equal 6 symbols", "Password Error")
        } else {
            return api.put(`/v1/users/update_profile`, {password: password})
                .then(NotificationManager.success("Password update was successful.", "Password Update"))
        }
    }
    return (
        <>
            <div className='content-block mb-4 pb-4'>
                <div className='table-header mb-1'>Change password</div>
                <div className='form-container col-12'>
                    <Form>
                        <div className='d-flex flex-md-row flex-column py-2
                                                    justify-content-center align-items-center '>
                            <Form.Group className="col-xl-3 col-md-4 col-sm-6 col-8 mx-2 mx-xl-3"
                                        controlId="changePassword">
                                <Form.Control type="password" placeholder="New password"
                                              onChange={handlePasswordChange}/>
                            </Form.Group>

                            <Form.Group className="col-xl-3 col-md-4 col-sm-6 col-8 mx-2 mx-xl-3 my-md-0 my-3 "
                                        controlId="changePasswordConfirmation">
                                <Form.Control type="password" placeholder="Repeat new password"
                                              onChange={handlePasswordConfirmationChange}/>
                            </Form.Group>

                            <Button type="submit" className='col-md-2 col-sm-3 col-4 mx-xl-3 mx-2'
                                    onClick={onSubmit}>Change</Button>

                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
};

const ChangeCurrencyView = () => {
    const api = useApi()
    const [currency, setCurrency] = useState(false);

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const onSubmit = () => {
        return api.put(`/v1/users/update_profile`, {currency: currency})
            .then(NotificationManager.success("Currency update was successful.", "Currency Update"))
    }

    const currentCurrency = () => {
         api.get(`/v1/users/user_details`)
             .then((response) => setCurrency(response.data["currency"]))
    }
    useEffect(() => {
        if (currency === false){
         currentCurrency();
            }
        }, [currency]
    )
    return (
        <>
            <div className='content-block mb-4 pb-4'>
                <div className='table-header mb-1'>Change currency</div>
                <div className='form-container col-12'>
                    <Form>
                        <div className='d-flex justify-content-center py-2'>
                            <Form.Group className="col-xl-2 col-md-3 col-sm-4 col-5 mx-xl-3 mx-2"
                                        controlId="changeCurrency">
                                <Form.Control type="text" placeholder="Currency" value={currency}
                                              onChange={handleCurrencyChange}/>
                            </Form.Group>

                            <Button type="submit" className='col-xl-2 col-md-2 col-sm-3 col-4 mx-xl-3 mx-2'
                                    onClick={onSubmit}>
                                Change
                            </Button>

                        </div>
                    </Form>
                </div>
            </div>

        </>
    )
};

class Settings extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='content settings-template'>
                    <ChangePasswordView />
                    <ChangeCurrencyView />
                </div>
            </div>
        )
    }
}
export default Settings;