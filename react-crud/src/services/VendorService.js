/* eslint-disable import/no-anonymous-default-export */
import http from "../http-common";

const getAll = () => {
  return http.get("/vendor");
};

const get = (id) => {
  return http.get(`/vendor/${id}`);
};

const getRetail = () => {
  return http.get("/vendor/retail");
};

const getPersonal = () => {
  return http.get("/vendor/personal");
};

const create = (data) => {
  return http.post("/vendor", data);
};

const update = (id, data) => {
  return http.put(`/vendor/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/vendor/${id}`);
};

const removeAll = () => {
  return http.delete(`/vendor`);
};

const findByName = (vname) => {
  return http.get(`/vendor?vname=${vname}`);
};



export default {
  getAll,
  get,
  getRetail,
  getPersonal,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
