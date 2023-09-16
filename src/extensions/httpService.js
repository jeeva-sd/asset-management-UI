import axios from 'axios';
import { toast } from 'react-toastify';
import { apiBaseUrl, connectLocalAPI } from '../../config';

class HttpService {
    constructor() {
        const instance = axios.create({
            baseURL: !connectLocalAPI ? apiBaseUrl : 'http://localhost:3001/',
            timeout: 300000,
        });

        this.instance = instance;
        this.pendingRequests = new Map();
    }

    cancelPendingRequests(url) {
        if (this.pendingRequests.has(url)) {
            const cancelToken = this.pendingRequests.get(url);
            cancelToken.cancel('Request cancelled due to duplication');
        }
        this.pendingRequests.delete(url);
    }

    setAuthToken(token) {
        this.instance.defaults.headers.common['x-access-token'] = token;
    }

    request(config) {
        this.cancelPendingRequests(config.url);

        const source = axios.CancelToken.source();
        this.pendingRequests.set(config.url, source);

        config.cancelToken = source.token;
        return this.instance.request(config)
            .then((response) => {
                if (response && response.data && response.data.message) {
                    toast.info(response.data.message, { position: toast.POSITION.TOP_RIGHT });
                }

                this.pendingRequests.delete(config.url);
                return response;
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request cancelled:', error.message);
                } else {

                    if (error.response && error.response.data && error.response.data.error) {
                        // Display the custom error message from the backend using toast
                        toast.error(error.response.data.error, { position: toast.POSITION.TOP_RIGHT });
                    } else {
                        // Display a generic error message
                        toast.error('An error occurred while processing your request.', { position: toast.POSITION.TOP_RIGHT });
                    }
                }
                throw error;
            });
    }

    get(url, config) {
        return this.request({ ...config, method: 'get', url });
    }

    post(url, data, config) {
        return this.request({ ...config, method: 'post', url, data });
    }

    put(url, data, config) {
        return this.request({ ...config, method: 'put', url, data });
    }

    delete(url, data, config) {
        return this.request({ ...config, method: 'delete', url, data });
    }
}

export default new HttpService();
