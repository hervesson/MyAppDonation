import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "http://e31528f8a587.ngrok.io/api",
  responseType: 'json'
});

export default api;