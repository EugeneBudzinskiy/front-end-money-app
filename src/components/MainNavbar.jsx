import './MainNavbar.css';

import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { Link, NavLink } from "react-router-dom";

import ModalPopup from "./ModalPopup";
import { IHome, ICategory, IIncome, ICosts, ISettings, ILogout, ILogin, IRegistration } from "./Icons";


function RegisterForm() {
    return (
        <>
            <Form.Group className="mb-3" controlId="formRegisterEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRegisterPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRegisterPasswordConfirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat Password" />
            </Form.Group>
        </>
    )
}


function LoginForm() {
    return (
        <>
            <Form.Group className="mb-3" controlId="formLoginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fromLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
        </>
    )
}


function NavbarMenu(props) {
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

                    <NavLink to='/settings' className='nav-link d-flex align-items-center'>
                        <ISettings width='24' height='24' /><span>Settings</span>
                    </NavLink>

                    <Button type='button' className='nav-link d-flex align-items-center'>
                        <ILogout width='24' height='24' /><span>Log Out</span>
                    </Button>

                    <div className='d-flex flex-column mt-5 pt-5'>
                        <span className='opacity-50'>test links (pls ignore)</span>
                        <ModalPopup buttonClassName='nav-link' buttonTitle='Register'
                                    buttonIcon={ <IRegistration width='24' height='24' /> }
                                    modalBody={ < RegisterForm /> }
                                    modalTitle='Registration' modalButtonTitle='Register'/>
                        <ModalPopup buttonClassName='nav-link' buttonTitle='Log In'
                                    buttonIcon={ <ILogin width='24' height='24' /> }
                                    modalBody={ < LoginForm /> }
                                    modalTitle='Log In' modalButtonTitle='Log In'/>

                    </div>
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