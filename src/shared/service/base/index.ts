import axios from 'axios';
import config from '../config';

export default {
    homeData: () => axios.get(config.root + "/api/homeData"),
    aboutData: () => axios.get(config.root + "/api/aboutData"),
}