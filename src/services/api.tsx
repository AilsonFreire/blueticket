import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';

const api = create({
    baseURL: 'http://soul-api.test.btservers.com.br/api'
});

api.addAsyncRequestTransform(request => async () => {
    const token = await AsyncStorage.getItem('@Blueticket:token');
    const pdv = JSON.parse(await AsyncStorage.getItem('@Blueticket:pdv'));
    const pos = JSON.parse(await AsyncStorage.getItem('@Blueticket:pos'));

    if (token && pdv && pos) {
        request.headers['Authorization'] = `Bearer ${token}`;
        request.headers['POS'] = `${pos[0].codigo}`;
        request.headers['PDV'] = `${pdv[0].codigo_ponto_venda}`;
    } else if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
})

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;