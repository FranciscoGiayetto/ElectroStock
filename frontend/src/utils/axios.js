
import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'https://electrostock-dev.fl0.io/auth/',
    timeout: 5000, // timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;