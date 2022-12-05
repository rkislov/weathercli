#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess} from './services/log.service.js';
import { saveKeyValue, TOKENDICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length){
        printError('Не пердан токен');
        return;
    }
    try {
        await saveKeyValue(TOKENDICTIONARY.token, token);
        printSuccess( 'Токен сохранен');
    } catch (error) {
        printError(error.message);
    }
    
}

const getForecast = async () => {
    try {
        const weather = await getWeather(process.env.CITY);
        console.log(weather);
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('Не верно указан город');
        } else if (error?.response?.status == 401) {
            printError('Не верно указан токен');
        } else {
            printError(error.message);
        }
    }

}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s){

    }
    if (args.t){
        return saveToken(args.t);
    }

    getForecast();
    
    
};

initCLI();