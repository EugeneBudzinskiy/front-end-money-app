import './Income.css';

import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";

import { IDelete, IEdit } from "./Icons";
import ModalPopup from "./ModalPopup";
import {useApi} from "../utilites/ApiProvider.tsx";
import {NotificationManager} from "react-notifications";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useSession} from "../utilites/Session";


function IncomeAddForm(props) {
    const api = useApi();
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    function refreshPage() {
        window.location.reload();
    }
    const handleSourceChange = (e) => {
        setSource(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const clearData = () =>{
        setSource("");
        setAmount("");
        setComment("");
    }

    const handleSubmit = () => {
        api.post('v1/incomes',{source: source, amount: amount, comment: comment})
            .then(clearData).then(props.handleHide).then(
            NotificationManager.success("New Income was added", "Success!")
        ).then(()=>refreshPage())
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Add new Income</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="sourceIncome">
                    <Form.Control type="text" placeholder="Source name" value={ source }
                                  onChange={ handleSourceChange }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="commentIncome">
                    <Form.Control type="text" placeholder="Comment" value={ comment }
                                  onChange={ handleCommentChange }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="amountIncome">
                    <Form.Control type="text" placeholder="Amount" value={ amount }
                                  onChange={ handleAmountChange }/>
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

function IncomeEditForm(props) {
    const api = useApi();
    const [source, setSource] = useState(props.data.source);
    const [amount, setAmount] = useState(props.data.amount);
    const [comment, setComment] = useState(props.data.comment);


    const handleSourceChange = (e) => {
        setSource(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    function refreshPage() {
        window.location.reload();
    }

    const handleSubmit = () => {
        api.put('v1/incomes/' + props.data.id,{source: source, amount: amount, comment: comment})
            .then(props.handleHide).then(
            NotificationManager.success("New Income was added", "Success!")
        ).then(()=>refreshPage())
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Edit Income</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="sourceIncome">
                    <Form.Control type="text" placeholder="Source name" value={ source }
                                  onChange={ handleSourceChange }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="commentIncome">
                    <Form.Control type="text" placeholder="Comment" value={ comment === 'null' ? "" : comment }
                                  onChange={ handleCommentChange }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="amountIncome">
                    <Form.Control type="text" placeholder="Amount" value={ amount }
                                  onChange={ handleAmountChange }/>
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


function IncomeDeleteForm(props) {
    const api = useApi()
    function refreshPage() {
        window.location.reload();
    }
    const handleSubmit = () => {
        api.delete('v1/incomes/' + props.data.id).then(props.handleHide).then(
            NotificationManager.success("Chosen Income was deleted", "Success!")
        ).then(()=>refreshPage())
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Delete Income</Modal.Title>
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

const GetIncomes = () => {
    const {isAuthenticated} = useSession()
    const [loginMessage, setLoginMessage] = useState(true)
    const [incomes, setIncomes] = useState([]);
    const [isLoadedIncome, setIsLoadedIncome] = useState(false);
    const api = useApi();

    const handleResponse = (response) => {
        const incomesForTheseUser = response.data.incomes.map(
            (income) => ({
                ...income,
                source: `${income["source"]}`,
                comment: `${income["comment"]}`,
                amount: `${income["amount"]}`,
                currency: `${income["currency"]}`,
            })
        );

        setIncomes(incomesForTheseUser);
        console.log(response);
        setIsLoadedIncome(true);
    };

    useEffect(() => {
        if (!isAuthenticated() && loginMessage){
            NotificationManager.info("Log in please to see your data", "Log In Please");
            setLoginMessage(false);
        }

        console.log(!isLoadedIncome, isAuthenticated(), incomes.length <= 0)

        if (!isLoadedIncome && isAuthenticated() && incomes.length <= 0) {
            api.get(`/v1/incomes`).then((response) => {
                handleResponse(response);
            });
        }
    }, [incomes]);

    return(
        <>
            {isAuthenticated() && incomes.length > 0 && incomes.map((income) => (
                <div className='row g-0 py-2'>
                    <div className='col order-0 title'>{ income.source }</div>
                    <div className='col-md col-12 order-md-1 order-3 ps-lg-0 px-2 comment'>
                        {(income.comment === "null" || income.comment === "")
                            && <span className='no-comment'>"No comment"</span>}
                        {income.comment !== "null" && income.comment}
                    </div>
                    <div className='col-md-2 col-sm-3 col-4 order-md-2 order-1 amount text-success'>
                        <span className='sign'>+</span>
                        <span className='value me-1'>{ income.amount }</span>
                        <span className='currency'>{ income.currency }</span>
                    </div>
                    <div className='d-flex order-md-3 order-2 w-auto actions'>
                        <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                    buttonIcon={ <IEdit /> } modalForm={ IncomeEditForm }
                                    data={income} />
                        <ModalPopup buttonVariant='outline-danger' buttonClassName='shadow-none'
                                    buttonIcon={ <IDelete /> } modalForm={ IncomeDeleteForm }
                                    data={income} modalSize='sm' />
                    </div>
                </div>
            ))}
            {isAuthenticated() && incomes.length <= 0 &&
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
                                            modalForm={ IncomeAddForm } />
                            </div>
                        </div>
                    </div>

                    <div className='content'>
                        <div className='table-header mb-1'>List of incomes</div>
                        <div className='table-content'>
                            <GetIncomes />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Income;