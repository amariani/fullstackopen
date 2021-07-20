import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (dataObject) => {
  const request = axios.post(baseUrl, dataObject);
  return request.then((res) => res.data);
};

const update = (id, newData) => {
  const request = axios.put(`${baseUrl}/${id}`, newData);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
