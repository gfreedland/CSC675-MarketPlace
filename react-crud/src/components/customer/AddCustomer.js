import React, { useState } from 'react';
import CustomerDataService from '../../services/CustomerService';

const AddCustomer = () => {
  const initialCustomerState = {
    id: null,
    cname: "",
    cpassword: "",
    caddress: "",
    cemail: "",
    cdate: ""
  };
  const [customer, setCustomer] = useState(initialCustomerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = () => {
    var data = {
      cname: customer.cname,
      cpassword: customer.cpassword,
      caddress: customer.caddress,
      cemail: customer.cemail,
    };

    CustomerDataService.create(data)
      .then(response => {
        setCustomer({
          id: response.data.id,
          cname: response.data.cname,
          cpassword: response.data.cpassword,
          cemail: response.data.cemail,
          caddress: response.data.caddress,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCustomer = () => {
    setCustomer(initialCustomerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCustomer}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="cname">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="cname"
              required
              value={customer.cname}
              onChange={handleInputChange}
              name="cname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpassword">Customer Password</label>
            <input
              type="text"
              className="form-control"
              id="cpassword"
              required
              value={customer.cpassword}
              onChange={handleInputChange}
              name="cpassword"
            />
          </div>

          <div className="form-group">
            <label htmlFor="caddress">Customer Address</label>
            <input
              type="text"
              className="form-control"
              id="caddress"
              required
              value={customer.caddress}
              onChange={handleInputChange}
              name="caddress"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cemail">Customer Email</label>
            <input
              type="text"
              className="form-control"
              id="cemail"
              required
              value={customer.cemail}
              onChange={handleInputChange}
              name="cemail"
            />
          </div>

          <button onClick={saveCustomer} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
