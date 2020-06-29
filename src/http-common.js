import axios from "axios";

export default axios.create({
  baseURL: "https://be-fullstack.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});