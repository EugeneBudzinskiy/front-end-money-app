import './Home.css';

import React, {useEffect, useState} from 'react';

import ToggleGraph from './ToggleGraph'
import { IArrowUp, IArrowDown } from "./Icons";
import {useApi} from "../utilites/ApiProvider.tsx";
import {NotificationManager} from 'react-notifications';
import {useSession} from "../utilites/Session.jsx";

const RecentTransactions = () => {
    const {isAuthenticated} = useSession()
    const [loginMessage, setLoginMessage] = useState(true)
    const [transactions, setTransactions] = useState([]);
    const [isLoadedTransaction, setIsLoadedTransaction] = useState(false);
    const api = useApi()
    const handleResponse = (response) => {
        const transactionsForTheseUser = response.data.map(
            (transaction) => ({
                ...transaction,
                type: `${transaction["type"]}`,
                currency: `${transaction["currency"]}`,
                category: `${transaction["category"]}`,
                comment: `${transaction["comment"]}`,
                date: `${transaction["date"]}`,
                amount: `${transaction["amount"]}`,
            })
        );

        setTransactions(transactionsForTheseUser);
        console.log(response)
        setIsLoadedTransaction(true);
    };

    useEffect(() => {
        if (!isAuthenticated() && loginMessage){
            NotificationManager.info("Log in please to see your data", "Log In Please")
            setLoginMessage(false)
        }
        if (!isLoadedTransaction && isAuthenticated() && transactions.length <= 0) {
            api.get(`/v1/statistic/recent_transactions`).then((response) => {
                handleResponse(response);
            });
        }
    }, [transactions]);

    return(
        <>
            {isAuthenticated() && transactions.length > 0 && transactions.map((transaction) => (
                <div className='row g-0 py-2'>
                    <div className='col-lg col-sm-9 col-8 order-lg-0 order-0 d-flex title'>
                            {transaction.type === "income"&&
                                <div className='arrow me-2 text-success'>
                                    <IArrowUp />
                                </div>}
                            {transaction.type === "cost" &&
                                <div className='arrow me-2 text-danger'>
                                    <IArrowDown />
                                </div>
                            }

                        <span>{transaction.category}</span>
                    </div>
                    <div className='col-lg col-sm-9 col-8 order-lg-1 order-2 ps-lg-0 px-2 comment'>
                        {transaction.comment === "null" && <span className='no-comment'>"No comment"</span>}
                        {transaction.comment !== "null" && transaction.comment}
                    </div>
                    <div className='col-md-2 col-sm-3 col-4 order-lg-2 order-3 date'>{transaction.date}</div>
                    {transaction.type === "income"&&
                        <div className='col-md-2 col-sm-3 col-4 order-lg-3 order-1 amount text-success'>
                            <span className='sign'>+</span>
                            <span className='value me-1'>{transaction.amount}</span>
                            <span className='currency'>{transaction.currency}</span>
                        </div>
                    }
                    {transaction.type === "cost"&&
                        <div className='col-md-2 col-sm-3 col-4 order-lg-3 order-1 amount text-danger'>
                            <span className='sign'>-</span>
                            <span className='value me-1'>{transaction.amount}</span>
                            <span className='currency'>{transaction.currency}</span>
                        </div>
                    }
                </div>
            ))}
            {isAuthenticated() && transactions.length <= 0 &&
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

class Home extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='home-template d-flex flex-column'>

                    <div className='analytics mb-4'>
                        <div className='graph-header mb-2'>Data analytics</div>
                        <div className='graph-content'>
                            <ToggleGraph />
                        </div>
                    </div>

                    <div className='content'>
                        <div className='table-header mb-1'>Recent transactions</div>
                        <div className='table-content'>
                            <RecentTransactions />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;