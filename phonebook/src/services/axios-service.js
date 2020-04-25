import axios from 'axios';

const url = 'http://localhost:3002/persons';

const getAll = () => {
  const req = axios.get(url);
  return req.then(res => res.data);
}

const newPerson = (obj) => {
  const req = axios.post(url, obj);
  return req.then(res => res.data);
}

const deletePerson = (id) => {
  const req = axios.delete(`${url}/${id}`);
  return req.then(res => res.data);
}

export default {getAll, newPerson, deletePerson}
