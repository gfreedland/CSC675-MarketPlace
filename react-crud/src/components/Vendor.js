import React, { useState, useEffect } from 'react';
import VendorDataService from "../services/VendorService";

const Vendor = props => {
  const initialVendorState = {
    id: null,
    vname: '',
    vtype: '',
    vaddress: '',
    vemail: '',
  };
  const [currentVendor, setCurrentVendor] = useState(initialVendorState);
  const [message, setMessage] = useState("");

  const getVendor = id => {
    VendorDataService.get(id)
      .then(response => {
        setCurrentVendor(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getVendor(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentVendor({ ...currentVendor, [name]: value });
  };

  const updateVendor = () => {
    VendorDataService.update(currentVendor.id, currentVendor)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteVendor = () => {
    VendorDataService.remove(currentVendor.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/vendor");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {currentVendor ? (
      <div className="edit-form">
        <h4>Vendor</h4>
        <form>
          <div className="form-group">
            <label htmlFor="vname">Vendor Name</label>
            <input
              type="text"
              className="form-control"
              id="vname"
              name="vname"
              value={currentVendor.vname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vtype">Vendor Type</label>
            <input
              type="text"
              className="form-control"
              id="vtype"
              name="vtype"
              value={currentVendor.vtype}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="vaddress">Vendor Address</label>
            <input
              type="text"
              className="form-control"
              id="vaddress"
              required
              value={currentVendor.vaddress}
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
              value={currentVendor.vemail}
              onChange={handleInputChange}
              name="vemail"
            />
          </div>
        </form>

        <button className="badge badge-danger mr-2" onClick={deleteVendor}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateVendor}
        >
          Update Vendor
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Vendor...</p>
      </div>
    )}
  </div>
  );
};

export default Vendor;
