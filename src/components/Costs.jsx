import './Costs.css';

import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Checkbox from "@material-ui/core/Checkbox";
import { IDelete, IEdit } from "./Icons";
import ModalPopup from "./ModalPopup";
import {useApi} from "../utilites/ApiProvider.tsx";
import {NotificationManager} from "react-notifications";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useSession} from "../utilites/Session";

function AutocompleteCategories(setCategory,defaultCategory, api) {
    // const [search, setSearch] = useState(defaultCategory || "");
    // const [options, setOptions] = useState(['Cost','Blabla']);
    // const [initialFetchStarted, setInitialFetchStarted] = useState(false);
    // const [typingTimeout, setTypingTimout] = useState(0);
    //
    // const searchOptions = (evt) => {
    //     if (typingTimeout) {
    //         clearTimeout(typingTimeout);
    //     }
    //     setSearch(evt.target.value);
    // };
    //
    // useEffect(() => {
    //     setTypingTimout(setTimeout(fetchOptions, 1000));
    // }, [search]);
    //
    // const fetchOptions = () => {
    //     let params = {};
    //     if (search && search !== "") {
    //         params = {
    //             name_like: search
    //         };
    //     }
    //     // api.get(`/v1/categories`).then((response) => {
    //     //     setOptions(response.categories.map((r) => {return r.name;}));
    //     // });
    // };
    //
    // if (options.length === 0 && !initialFetchStarted) {
    //     fetchOptions();
    //     setInitialFetchStarted(true);
    // }
    // return (
    //     <>
    //         <Form.Control
    //                 value={search}
    //                 onChange={searchOptions}
    //         />
    //             {options.map((option, index) => {
    //                 let isChecked = (search===option)
    //                 return (
    //                     <div key={index}>
    //                         <Checkbox
    //                             val={option}
    //                             checked={isChecked}
    //                             onClick={() => setCategory(option)}
    //                         />
    //                         {option}
    //                     </div>
    //                 );
    //             })}
    //     </>
    // );
}

function CostsAddForm(props) {
    const api = useApi();
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const clearData = () =>{
        setCategory("");
        setAmount("");
        setComment("");
    }
    const [options, setOptions] = useState(['Cost','Blabla']);
    const [initialFetchStarted, setInitialFetchStarted] = useState(false);
    const [typingTimeout, setTypingTimout] = useState(0);

    const searchOptions = (evt) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setCategory(evt.target.value);
    };

    useEffect(() => {
        setTypingTimout(setTimeout(fetchOptions, 1000));
    }, [category]);

    const fetchOptions = () => {
        let params = {};
        if (category && category !== "") {
            params = {
                name_like: category
            };
        }
        api.get(`/v1/categories/search`, {params}).then((response) => {
            setOptions(response.data.categories.map((r) => {return r.name;}));
        });
    };

    if (options.length === 0 && !initialFetchStarted) {
        fetchOptions();
        setInitialFetchStarted(true);
    }

    const handleSubmit = () => {
        api.post('/v1/costs',{category_name: category, amount: amount, cost_description: comment})
            .then(clearData).then(props.handleHide).then(
            NotificationManager.success("New Costs was added", "Success!")
        )
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Add new Costs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="commentICosts">
                    <Form.Control type="text" placeholder="Comment" value={ comment }
                                  onChange={ handleCommentChange }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="amountICosts">
                    <Form.Control type="text" placeholder="Amount" value={ amount }
                                  onChange={ handleAmountChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="commentICosts">

                <Form.Control
                    value={category}
                    onChange={searchOptions}
                />
                {options.map((option, index) => {
                    let isChecked = (category===option)
                    return (
                        <div key={index}>
                            <Checkbox
                                val={option}
                                checked={isChecked}
                                onClick={() => setCategory(option)}
                            />
                            {option}
                        </div>
                    );
                })}
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

function CostsEditForm(props) {
    const api = useApi();
    const [category, setCategory] = useState(props.data.category);
    const [amount, setAmount] = useState(props.data.amount);
    const [comment, setComment] = useState(props.data.comment);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        api.put('/v1/costs/' + props.data.id,{category_name: category, amount: amount, cost_description: comment})
            .then(props.handleHide).then(
            NotificationManager.success("The Cost was updated!", "Success!")
        )
    };
    const [options, setOptions] = useState(['Cost','Blabla']);
    const [initialFetchStarted, setInitialFetchStarted] = useState(false);
    const [typingTimeout, setTypingTimout] = useState(0);

    const searchOptions = (evt) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setCategory(evt.target.value);
    };

    useEffect(() => {
        setTypingTimout(setTimeout(fetchOptions, 1000));
    }, [category]);

    const fetchOptions = () => {
        let params = {};
        if (category && category !== "") {
            params = {
                name_like: category
            };
        }
        api.get(`/v1/categories/search`, {params}).then((response) => {
            setOptions(response.data.categories.map((r) => {return r.name;}));
        });
    };

    if (options.length === 0 && !initialFetchStarted) {
        fetchOptions();
        setInitialFetchStarted(true);
    }
    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Edit Costs</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Group className="mb-3" controlId="commentIncome">
                    <Form.Control type="text" placeholder="Comment" value={ comment === 'null' ? "" : comment }
                                  onChange={ handleCommentChange }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="amountIncome">
                    <Form.Control type="text" placeholder="Amount" value={ amount }
                                  onChange={ handleAmountChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="commentICosts">

                    <Form.Control
                        value={category}
                        onChange={searchOptions}
                    />
                    {options.map((option, index) => {
                        let isChecked = (category===option)
                        return (
                            <div key={index}>
                                <Checkbox
                                    val={option}
                                    checked={isChecked}
                                    onClick={() => setCategory(option)}
                                />
                                {option}
                            </div>
                        );
                    })}
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


function CostsDeleteForm(props) {
    const api = useApi()

    const handleSubmit = () => {
        api.delete('v1/costs/' + props.data.id).then(props.handleHide).then(
            NotificationManager.success("Chosen Costs was deleted", "Success!")
        )
    };

    return (
        <>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Delete Costs</Modal.Title>
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

const GetCosts = () => {
    const {isAuthenticated} = useSession();
    const [loginMessage, setLoginMessage] = useState(true);
    const [costs, setCosts] = useState([]);
    const [isLoadedCost, setIsLoadedCost] = useState(false);
    const api = useApi();

    const handleResponse = (response) => {
        const costsForTheseUser = response.data.costs.map(
            (cost) => ({
                ...cost,
                category: `${cost["category_name"]}`,
                comment: `${cost["cost_description"]}`,
                amount: `${cost["amount"]}`,
                currency: `${cost["currency"]}`,
            })
        );

        setCosts(costsForTheseUser);
        console.log(response);
        setIsLoadedCost(true);
    };

    useEffect(() => {
        if (!isAuthenticated() && loginMessage){
            NotificationManager.info("Log in please to see your data", "Log In Please");
            setLoginMessage(false);
        }
        if (!isLoadedCost && isAuthenticated() && costs.length <= 0) {
            api.get(`/v1/costs`).then((response) => {
                handleResponse(response);
            });
        }
    }, [costs]);

    return(
        <>
            {isAuthenticated() && isAuthenticated() && costs.length > 0 && costs.map((cost) => (
                <div className='row g-0 py-2'>
                    <div className='col order-0 title'>{ cost.category }</div>
                    <div className='col-md col-12 order-md-1 order-3 ps-lg-0 px-2 comment'>
                        {(cost.comment === "null" || cost.comment === "")
                            && <span className='no-comment'>"No comment"</span>}
                        {cost.comment !== "null" && cost.comment}
                    </div>
                    <div className='col-md-2 col-sm-3 col-4 order-md-2 order-1 amount text-danger'>
                        <span className='sign'>-</span>
                        <span className='value me-1'>{ cost.amount }</span>
                        <span className='currency'>{ cost.currency }</span>
                    </div>
                    <div className='d-flex order-md-3 order-2 w-auto actions'>
                        <ModalPopup buttonVariant='outline-success' buttonClassName='me-2 shadow-none'
                                    buttonIcon={ <IEdit /> } modalForm={ CostsEditForm }
                                    data={cost} />
                        <ModalPopup buttonVariant='outline-danger' buttonClassName='shadow-none'
                                    buttonIcon={ <IDelete /> } modalForm={ CostsDeleteForm }
                                    data={cost} modalSize='sm' />
                    </div>
                </div>
            ))}
            {isAuthenticated() && isAuthenticated() && costs.length <= 0 &&
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
                                            modalForm={ CostsAddForm }/>
                            </div>
                        </div>
                    </div>

                    <div className='content'>
                        <div className='table-header mb-1'>List of Costs</div>
                        <div className='table-content'>
                            <GetCosts />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Costs;