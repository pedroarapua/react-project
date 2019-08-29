import axios from 'axios';
import md5 from 'js-md5';

/* Conexão com a API utilizando Axios*/
const publicApiKey = '2a18d79361dbac2025df4b84f6a26d20';
const privateApiKey = 'b133de75904157d8c9138819e4e56288ca39c755';
const timestamp = Number(new Date());
const hash = md5.create();

const api = axios.create({
    baseURL: '//gateway.marvel.com/v1/public/',
    timeout: 30000,
    params: {
        ts: timestamp,
        apikey: publicApiKey,
        hash: hash.update(timestamp + privateApiKey + publicApiKey)
    }
});

const getMethods = {
    /* Busca a informação de todos os heróis com base nos filtros selecionados */
    getHeroes (order, params){
        
        /* Busca os parâmetros enviados pela URL*/
        const getParams = new URLSearchParams(params);
        let paramsUrl = '';

        if(getParams && getParams.get('name')){
            paramsUrl += '&nameStartsWith=' + getParams.get('name');
        }

        if(getParams && getParams.get('offset')){
            paramsUrl += '&offset=' + getParams.get('offset');
        }

        const url = 'characters?ts=' + timestamp + '&apikey=' + publicApiKey + '&hash=' + hash + '&limit=24' + paramsUrl;
        const filterOrder = '&orderBy=' + order;
        
        const resp = api.get(url + filterOrder);
        console.log(resp);

        return resp;
    },
    /* Busca a informação de apenas um herói, de acordo com seu "ID" */
    getHero (id){
        const url = 'characters/' + id + '?ts=' + timestamp + '&apikey=' + publicApiKey + '&hash=' + hash;
        const resp = api.get(url);

        return resp;
    },
    /* Busca os Heróis favoritados */
    getFavoriteHeroes(ids){
        const resp = '';
        console.log('ok');
        return resp;
    }
};
        
export default getMethods;