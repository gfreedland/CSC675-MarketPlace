import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Vendor from './components/vendor/Vendor';
import VendorList from './components/vendor/VendorList';
import AddVendor from './components/vendor/AddVendor';

import Customer from './components/customer/Customer';
import CustomerList from './components/customer/CustomerList';
import AddCustomer from './components/customer/AddCustomer';

function App() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
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
            <li className="nav-item">
              <Link to={"/customer/"} className="nav-link">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addcustomer"} className="nav-link">
                Add Customers
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/vendor"]} component={VendorList} />
            <Route exact path="/addvendor" component={AddVendor} />
            <Route path="/vendor/:id" component={Vendor} />
            <Route exact path="/customer" component={CustomerList} />
            <Route exact path="/addcustomer" component={AddCustomer} />
            <Route path="/customer/:id" component={Customer} />
          </Switch>
        </div>
      </div>
    );
}

export default App;
