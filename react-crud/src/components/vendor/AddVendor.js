import React, { useState } from 'react';
import VendorDataService from '../../services/VendorService';

const AddVendor = () => {
  const initialVendorState = {
    id: null,
    vname: "",
    vtype: "",
    vaddress: "",
    vemail: "",
    vdate: ""
  };
  const [vendor, setVendor] = useState(initialVendorState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setVendor({ ...vendor, [name]: value });
  };

  const saveVendor = () => {
    var data = {
      vname: vendor.vname,
      vtype: vendor.vtype,
      vaddress: vendor.vaddress,
      vemail: vendor.vemail
    };

    VendorDataService.create(data)
      .then(response => {
        setVendor({
          id: response.data.id,
          vname: response.data.vname,
          vtype: response.data.vtype,
          vemail: response.data.vemail,
          vaddress: response.data.vaddress,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newVendor = () => {
    setVendor(initialVendorState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newVendor}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="vname">Vendor Name</label>
            <input
              type="text"
              className="form-control"
              id="vname"
              required
              value={vendor.vname}
              onChange={handleInputChange}
              name="vname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vendortype">Vendor Type</label>
            <input
              type="text"
              className="form-control"
              id="vtype"
              required
              value={vendor.vtype}
              onChange={handleInputChange}
              name="vtype"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vaddress">Vendor Address</label>
            <input
              type="text"
              className="form-control"
              id="vaddress"
              required
              value={vendor.vaddress}
              onChange={handleInputChange}
              name="vaddress"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vemail">Vendor Email</label>
            <input
              type="text"
              className="form-control"
              id="vemail"
              required
              value={vendor.vemail}
              onChange={handleInputChange}
              name="vemail"
            />
          </div>

          <button onClick={saveVendor} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddVendor;
