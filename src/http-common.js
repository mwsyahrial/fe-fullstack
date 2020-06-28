import axios from "axios";

export default axios.create({
  baseURL: "http://be-fullstack.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});