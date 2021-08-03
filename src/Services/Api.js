import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "https://semfome.api.7clicks.dev/api",
  responseType: 'json'
});

export default api;