import './MainNavbar.css';

import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { Link, NavLink } from "react-router-dom";

import ModalPopup from "./ModalPopup";
import { IHome, ICategory, IIncome, ICosts, ISettings, ILogout, ILogin, IRegistration } from "./Icons";
import Modal from 'react-bootstrap/Modal';
import {useSession} from "../utilites/Session.jsx";
import {NotificationManager} from 'react-notifications';


function RegisterForm(handleHide) {
    const {signup} = useSession();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const emailRegex = /^\S+@\S+$/;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };
    const clearData = () =>{
        setEmail("")
        setPasswordConfirmation("")
        setPassword("")
    }
    const handleSubmit = () => {
        if (password !== passwordConfirmation) {
            NotificationManager.error("Password and Password Confirmation should match", "Password Error")
        } else if (password.length < 6)
        {
            NotificationManager.error("Password should have more then or equal 6 symbols", "Password Error")
        }
        else if(!email.match(emailRegex)){
            NotificationManager.error("Email should be like example@test.com", "Email Error")
        }
        else {
            signup({email: email, password: password, confirmation_password: passwordConfirmation}).then(clearData).then(handleHide()).then(
                NotificationManager.success("Registration Success", "Welcome")
            )
        }
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formRegisterEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={handleEmailChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRegisterPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={handlePasswordChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRegisterPasswordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" value={passwordConfirmation}
                                  onChange={handlePasswordConfirmationChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='popup-btn col-4 py-2' onClick={ handleSubmit }>
                    Sign Up
                </Button>
            </Modal.Footer>
        </>
    )
}


function LoginForm(handleHide) {
    const {login} = useSession();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const emailRegex = /^\S+@\S+$/;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const clearData = () =>{
        setEmail("")
        setPassword("")
    }

    const handleSubmit = () => {
        if (password.length < 0)
        {
            NotificationManager.error("Password must present", "Password Error")
        }
        else if(!email.match(emailRegex)){
            NotificationManager.error("Email should be like example@test.com", "Email Error")
        }
        else {
            login({email: email, password: password}).then(clearData).then(handleHide())
                .then(NotificationManager.success("Login Success", "Welcome"))
        }
    };
    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formLoginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fromLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='popup-btn col-4 py-2' onClick={handleSubmit}>
                    Sign In
                </Button>
            </Modal.Footer>
        </>
    )
}


function NavbarMenu(props) {
    const {isAuthenticated, logout} = useSession()
    return (
        <Navbar className="c-navbar d-flex align-items-start" variant="dark">
            <div className="d-flex flex-column ">

                <Link to='/' className='navbar-brand' onClick={ props.onClick }>Money App</Link>

                <Nav className="d-flex flex-column" onClick={ props.onClick }>

                    <NavLink to='/home' className='nav-link d-flex align-items-center'>
                        <IHome width='24' height='24' /><span>Home</span>
                    </NavLink>

                    <NavLink to='/category' className='nav-link d-flex align-items-center'>
                        <ICategory width='24' height='24' /><span>Category</span>
                    </NavLink>

                    <NavLink to='/income' className='nav-link d-flex align-items-center'>
                        <IIncome width='24' height='24' /><span>Income</span>
                    </NavLink>

                    <NavLink to='/costs' className='nav-link d-flex align-items-center'>
                        <ICosts width='24' height='24' /><span>Costs</span>
                    </NavLink>
                    {isAuthenticated() &&
                    <NavLink to='/settings' className='nav-link d-flex align-items-center'>
                        <ISettings width='24' height='24' /><span>Settings</span>
                    </NavLink> }
                    {isAuthenticated() &&
                    <Button type='button' className='nav-link d-flex align-items-center' onClick={logout}>
                        <ILogout width='24' height='24' /><span>Log Out</span>
                    </Button>}


                    {!isAuthenticated() &&
                        <div className='d-flex flex-column'>
                            <ModalPopup buttonClassName='nav-link' buttonTitle='Register'
                                        buttonIcon={<IRegistration width='24' height='24'/>}
                                        modalForm={RegisterForm}/>
                            <ModalPopup buttonClassName='nav-link' buttonTitle='Log In'
                                        buttonIcon={<ILogin width='24' height='24'/>}
                                        modalForm={LoginForm}/>

                        </div>
                    }
                </Nav>

            </div>
        </Navbar>
    )
}


function Sidebar() {
    const [sidebarFlag, setSidebarFlag] = useState(false);
    const showSidebar = () => setSidebarFlag(true);
    const hideSidebar = () => setSidebarFlag(false);

    return (
        <div className={sidebarFlag ? "sidebar active" : "sidebar"}>
            <Button className="hamburger shadow-none d-flex flex-column justify-content-around" type="button"
                    onClick={ sidebarFlag ? hideSidebar : showSidebar }>
                <div></div>
            </Button>
            <div className='pt-3 ps-3'>
                <NavbarMenu onClick={ hideSidebar } />
            </div>
        </div>
    );
}


class MainNavbar extends React.Component {
    render() {
        return (
            <>
                <div className='d-lg-block d-none'>
                    <NavbarMenu />
                </div>

                <div className='d-lg-none d-block'>
                    <Sidebar />
                </div>
            </>
        )
    }
}

export default MainNavbar;