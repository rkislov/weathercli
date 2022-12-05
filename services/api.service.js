import axios from 'axios';
import https from 'https';
import {getKeyValue, TOKENDICTIONARY} from './storage.service.js'
const getWeather = async (city) => {


    const token = process.env.TOKEN ?? await getKeyValue(TOKENDICTIONARY.token);
    if(!token) {
        throw new Error('Не задан ключ APIб задайье его комадой -t [API key]')
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });
 
    return data;

};

export { getWeather };