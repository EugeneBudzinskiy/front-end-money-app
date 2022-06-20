import './Category.css';

import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';

import { IDelete, IEdit } from "./Icons";
import ModalPopup from "./ModalPopup";
import {useApi} from "../utilites/ApiProvider.tsx";
import {NotificationManager} from "react-notifications";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useSession} from "../utilites/Session";


function CategoryAddForm(props) {
    const api = useApi()
    const [name, setName] = useState("");
    function refreshPage() {
        window.location.reload();
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const clearData = () =>{
        setName("")
    }
    const handleSubmit = () => {
        api.post('v1/categories',{name: name}).then(clearData).then(props.handleHide).then(
            NotificationManager.success("New Category was added", "Success!")
        ).then(()=> refreshPage())
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Add new Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="nameCategory">
                    <Form.Control type="text" placeholder="Category name" value={ name }
                                  onChange={ handleNameChange } />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='popup-btn col-4 py-2' onClick={ handleSubmit }>
                    Add
                </Button>
            </Modal.Footer>
        </>
    )
}

function CategoryEditForm(props) {
    const api = useApi()
    const [name, setName] = useState(props.data.name);
    function refreshPage() {
        window.location.reload();
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = () => {
        if(name.length <= 0){
            NotificationManager.error("Dont leave field empty", "Empty field Error")
        }
        else {
            api.put('v1/categories/' + props.data.id,{name: name}).then(props.handleHide).then(
                NotificationManager.success("New Category was added", "Success!")
            ).then(()=> refreshPage())
        }
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="nameCategory">
                    <Form.Control type="text" placeholder="Category name" value={ name }
                                  onChange={ handleNameChange  } />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='popup-btn col-4 py-2' onClick={ handleSubmit }>
                    Save
                </Button>
            </Modal.Footer>
        </>
    )
}


function CategoryDeleteForm(props) {
    const api = useApi()
    function refreshPage() {
        window.location.reload();
    }
    const handleSubmit = () => {
        api.delete('v1/categories/' + props.data.id).then(props.handleHide).then(
            NotificationManager.success("Chosen Category was deleted", "Success!")
        ).then(() => refreshPage())
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Are you sure?</div>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='popup-btn col-4 py-2' onClick={ handleSubmit }>Yes</Button>
                <Button className='popup-btn col-4 py-2' onClick={ props.handleHide }>No</Button>
            </Modal.Footer>
        </>
    )
}

const GetCategories = () => {
    const {isAuthenticated} = useSession()
    const [loginMessage, setLoginMessage] = useState(true)
    const [categories, setCategories] = useState([]);
    const [isLoadedCategory, setIsLoadedCategory] = useState(false);
    const api = useApi()
    const handleResponse = (response) => {
        const categoriesForTheseUser = response.data.categories.map(
            (category) => ({
                ...category,
                id: `${category["id"]}`,
                name: `${category["name"]}`,
            })
        );

        setCategories(categoriesForTheseUser);
        console.log(response);
        setIsLoadedCategory(true);
    };

    useEffect(() => {
        if (!isAuthenticated() && loginMessage){
            NotificationManager.info("Log in please to see your data", "Log In Please")
            setLoginMessage(false)
        }
        if (!isLoadedCategory || (isAuthenticated() && categories.length <= 0)) {
            api.get(`/v1/categories`).then((response) => {
                handleResponse(response);
            });
        }
    }, [categories]);

    return(
        <>
            {isAuthenticated() && categories.length > 0 && categories.map((category) => (
                <div className='row g-0 py-2'>
                    <div className='col title'>{ category.name }</div>
                    <div className='d-flex w-auto actions'>
                        <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                    buttonIcon={ <IEdit /> } modalForm={ CategoryEditForm }
                                    data={category}/>
                        <ModalPopup buttonVariant='outline-danger' buttonClassName='shadow-none'
                                    buttonIcon={ <IDelete /> } modalForm={ CategoryDeleteForm }
                                    data={category} modalSize='sm' />
                    </div>
                </div>
            ))}
            {isAuthenticated() && categories.length <= 0 &&
                <div className="d-flex mt-5 justify-content-center">
                    <span className="no-data-found">No Data Found</span>
                </div>
            }
            {!isAuthenticated() &&
                <div className="d-flex mt-5 justify-content-center">
                    <span className="non-user">Sign In or Sing Up to see Data</span>
                </div>
            }
        </>)
};

class Category extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-4'>
                <div className='category-template d-flex flex-column'>

                    <div className='add-form d-flex justify-content-center mb-4'>
                        <div className='form-container col-12'>
                            <div className='table-header mb-2'>Create new Category</div>
                            <div className='toggle-content d-flex flex-column'>
                                <ModalPopup buttonClassName='shadow-none col-12' buttonTitle='Add'
                                            modalForm={ CategoryAddForm } />
                            </div>
                        </div>
                    </div>

                    <div className='content'>
                        <div className='table-header mb-1'>List of Categories</div>
                        <div className='table-content'>

                            <GetCategories />

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Category;