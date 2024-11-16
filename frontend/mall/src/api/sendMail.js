import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}`

export const sendmail = async(data) => {
  
    const response = await axios.post(`${host}`+'/api/email/send', data);
  
    return response.data;
}


