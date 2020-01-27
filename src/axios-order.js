import axios from 'axios';

const instances = axios.create({
    baseURL: 'https://reactburger1.firebaseio.com'
})

export default instances;