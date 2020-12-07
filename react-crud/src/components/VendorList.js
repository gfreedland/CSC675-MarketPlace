import React, { useState, useEffect } from 'react';
import VendorDataService from '../services/VendorService';
import { Link } from "react-router-dom";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveVendors();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveVendors = () => {
    VendorDataService.getAll()
      .then(response => {
        setVendors(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveVendors();
    setCurrentVendor(null);
    setCurrentIndex(-1);
  };

  const setActiveVendor = (vendor, index) => {
    setCurrentVendor(vendor);
    setCurrentIndex(index);
  };

  const removeAllVendors = () => {
    VendorDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    VendorDataService.findByName(searchTitle)
      .then(response => {
        setVendors(response.data);
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
        <h4>Vendors List</h4>

        <ul className="list-group">
          {vendors &&
            vendors.map((vendor, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveVendor(vendor, index)}
                key={index}
              >
                {vendor.vname}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllVendors}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentVendor ? (
          <div>
            <h4>Vendor</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentVendor.vname}
            </div>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentVendor.id}
            </div>
            
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentVendor.vemail}
            </div>
            <div>
              <label>
                <strong>Type:</strong>
              </label>{" "}
              {currentVendor.vtype}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentVendor.vaddress}
            </div>
            <div>
              <label>
                <strong>Date Created:</strong>
              </label>{" "}
              {new Date(currentVendor.createdAt).toString('YYYY-MM-dd')}
            </div>

            <Link
              to={"/vendor/" + currentVendor.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Vendor...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorList;
