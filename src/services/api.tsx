import { create } from 'apisauce';

const api = create({
    baseURL: 'http://soul-api.test.btservers.com.br/api'
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;