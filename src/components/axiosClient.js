let axios = require('axios');

let axiosClient = axios.create({
    baseUrl: 'http://localhost:3001',
//    baseUrl: 'https://her-app-rails.herokuapp.com',
  });
export default axiosClient
