import React, { useState, useEffect } from 'react';
import CustomerDataService from '../../services/CustomerService';
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveCustomers();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCustomers = () => {
    CustomerDataService.getAll()
      .then(response => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCustomers();
    setCurrentCustomer(null);
    setCurrentIndex(-1);
  };

  const setActiveCustomer = (customer, index) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
  };

  const removeAllCustomers = () => {
    CustomerDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    CustomerDataService.findByName(searchTitle)
      .then(response => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Customers List</h4>

        <ul className="list-group">
          {customers &&
            customers.map((customer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCustomer(customer, index)}
                key={index}
              >
                {customer.cname}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCustomers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCustomer ? (
          <div>
            <h4>Customer</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentCustomer.id}
            </div> 
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCustomer.cname}
            </div>
            <div>
              <label>
                <strong>Password:</strong>
              </label>{" "}
              {currentCustomer.cpassword}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentCustomer.cemail}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentCustomer.caddress}
            </div>
            <div>
              <label>
                <strong>Date Created:</strong>
              </label>{" "}
              {new Date(currentCustomer.createdAt).toString('YYYY-MM-dd')}
            </div>

            <Link
              to={"/customer/" + currentCustomer.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
