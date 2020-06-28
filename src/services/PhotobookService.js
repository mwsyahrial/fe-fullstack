import http from "../http-common";

const getAll = () => {
  return http.get("/photobooks");
};

const get = id => {
  return http.get(`/photobooks/${id}`);
};

const create = data => {
  return http.post("/photobooks", data);
};

const update = (id, data) => {
  return http.put(`/photobooks/${id}`, data);
};

const remove = id => {
  return http.delete(`/photobooks/${id}`);
};

const removeAll = () => {
  return http.delete(`/photobooks`);
};

const findByTitle = title => {
  return http.get(`/photobooks?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};