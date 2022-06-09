import './Home.css';

import React from 'react';

import ToggleGraph from './ToggleGraph'
import { IArrowUp, IArrowDown } from "./Icons";


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

                            <div className='row g-0 py-2'>
                                <div className='col-lg col-sm-9 col-8 order-lg-0 order-0 d-flex title'>
                                    <div className='arrow me-2 text-success'>
                                        <IArrowUp />
                                    </div>
                                    <span>Savings</span>
                                </div>
                                <div className='col-lg col-sm-9 col-8 order-lg-1 order-2 ps-lg-0 px-2 comment'>
                                    <span className='no-comment'>No comment</span>
                                </div>
                                <div className='col-md-2 col-sm-3 col-4 order-lg-2 order-3 date'>30.01.2001</div>
                                <div className='col-md-2 col-sm-3 col-4 order-lg-3 order-1 amount text-success'>
                                    <span className='sign'>+</span>
                                    <span className='value me-1'>123</span>
                                    <span className='currency'>$</span>
                                </div>
                            </div>

                            <div className='row g-0 py-2'>
                                <div className='col-lg col-sm-9 col-8 order-lg-0 order-0 d-flex title'>
                                    <div className='arrow me-2 text-danger'>
                                        <IArrowDown />
                                    </div>
                                    <span>Restaurant</span>
                                </div>
                                <div className='col-lg col-sm-9 col-8 order-lg-1 order-2 ps-lg-0 px-2 comment'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt et dolore magna aliqua.
                                </div>
                                <div className='col-md-2 col-sm-3 col-4 order-lg-2 order-3 date'>30.01.2001</div>
                                <div className='col-md-2 col-sm-3 col-4 order-lg-3 order-1 amount text-danger'>
                                    <span className='sign'>-</span>
                                    <span className='value me-1'>123</span>
                                    <span className='currency'>$</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;