import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";

axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:8800/api/";

export default axios.create({
  baseURL,
});
