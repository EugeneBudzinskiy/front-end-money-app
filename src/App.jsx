import './App.css';

import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';

import MainNavbar from './components/MainNavbar';
import Home from "./components/Home";
import Category from "./components/Category";
import Income from "./components/Income";
import Costs from "./components/Costs";
import Settings from "./components/Settings.jsx";
import ApiProvider from "./utilites/ApiProvider.tsx";
import Session from "./utilites/Session.jsx";

function App() {
  return (
          <ApiProvider>
              <Session>
            <Container className='d-flex py-3'>
                <div className='col-lg-2 d-lg-flex d-block justify-content-between'>
                    <MainNavbar />
                    <div className='vr d-lg-block d-none'></div>
                </div>

                <div className='col-lg-10 col mt-lg-0 mt-5'>
                    <Routes>
                                <Route path='/' element={ <Home/> }/>
                                <Route path='/home' element={ <Home/> }/>
                                <Route path='/category' element={ <Category/> }/>
                                <Route path='/income' element={ <Income/> }/>
                                <Route path='/costs' element={ <Costs/> }/>
                                <Route path='/settings' element={ <Settings/> }/>

                    </Routes>
                </div>
            </Container>
              </Session>
        </ApiProvider>
);
}

export default App;
