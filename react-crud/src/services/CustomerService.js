/* eslint-disable import/no-anonymous-default-export */
import http from "../http-common";

const getAll = () => {
  return http.get("/customer");
};

const get = (id) => {
  return http.get(`/customer/${id}`);
};

const create = (data) => {
  return http.post("/customer", data);
};

const update = (id, data) => {
  return http.put(`/customer/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/customer/${id}`);
};

const removeAll = () => {
  return http.delete(`/customer`);
};

const findByName = (cname) => {
  return http.get(`/customer?cname=${cname}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
