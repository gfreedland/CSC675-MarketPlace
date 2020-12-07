import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Vendor from './components/Vendor';
import VendorList from './components/VendorList';
import AddVendor from './components/AddVendor';

function App() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/vendor" className="navbar-brand">
            The Market Place
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/vendor/"} className="nav-link">
                Vendors
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addvendor"} className="nav-link">
                Add Vendor
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/vendor"]} component={VendorList} />
            <Route exact path="/addvendor" component={AddVendor} />
            <Route path="/vendor/:id" component={Vendor} />
          </Switch>
        </div>
      </div>
    );
}

export default App;
