import React, { useState, useEffect } from 'react';
import CustomerDataService from "../../services/CustomerService";

const Customer = props => {
  const initialCustomerState = {
    id: null,
    cname: '',
    cpassword: '',
    caddress: '',
    cemail: '',
  };
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");

  const getCustomer = id => {
    CustomerDataService.get(id)
      .then(response => {
        setCurrentCustomer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCustomer(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updateCustomer = () => {
    CustomerDataService.update(currentCustomer.id, currentCustomer)
      .then(response => {
        console.log(response.data);
        setMessage("The customer was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCustomer = () => {
    CustomerDataService.remove(currentCustomer.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/customer");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {currentCustomer ? (
      <div className="edit-form">
        <h4>Customer</h4>
        <form>
          <div className="form-group">
            <label htmlFor="cname">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="cname"
              name="cname"
              value={currentCustomer.cname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Customer Password</label>
            <input
              type="text"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={currentCustomer.cpassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="caddress">Customer Address</label>
            <input
              type="text"
              className="form-control"
              id="caddress"
              required
              value={currentCustomer.caddress}
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
              value={currentCustomer.cemail}
              onChange={handleInputChange}
              name="cemail"
            />
          </div>
        </form>

        <button className="badge badge-danger mr-2" onClick={deleteCustomer}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateCustomer}
        >
          Update Customer
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Customer...</p>
      </div>
    )}
  </div>
  );
};

export default Customer;
