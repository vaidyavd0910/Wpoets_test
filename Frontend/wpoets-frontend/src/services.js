import axios from "axios";


  export const getData = async () => {
    const response = await axios.get('https://qjxc217k-5000.inc1.devtunnels.ms/api/projects', { withCredentials: true });
    return response.data; 
  }