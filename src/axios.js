// baseURL you have local and the functions
// after u deploy the cloud functions, you need to replace the local url with the new one
// thats the baseURL deployed.

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-b90f1/us-central1/api' // the API (cloud function) URL
});

export default instance;