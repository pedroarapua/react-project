import axios from 'axios';
import md5 from 'js-md5';

/* Conexão com a API utilizando Axios*/
const publicApiKey = '2a18d79361dbac2025df4b84f6a26d20';
const privateApiKey = 'b133de75904157d8c9138819e4e56288ca39c755';
const timestamp = Number(new Date());
const hash = md5.create();

const api = axios.create({
    baseURL: '//gateway.marvel.com/v1/public/',
    timeout: 20000,
    params: {
        ts: timestamp,
        apikey: publicApiKey,
        hash: hash.update(timestamp + privateApiKey + publicApiKey)
    }
});

const getMethods = {
    /* Busca a informação de todos os heróis com base nos filtros selecionados */
    getHeroes (order){
        const url = 'characters?ts=' + timestamp + '&apikey=' + publicApiKey + '&hash=' + hash + '&limit=24';
        const filterOrder = '&orderBy=' + order;
        const resp = api.get(url + filterOrder);
        return resp;
    },
    /* Busca a informação de apenas um herói, de acordo com seu "ID" */
    getHero (id){
        const url = 'characters/' + id + '?ts=' + timestamp + '&apikey=' + publicApiKey + '&hash=' + hash;
        return api.get(url);
    }
};
        
export default getMethods;