import axios from 'axios';
import md5 from 'js-md5';

/* Conexão com a API utilizando Axios*/
const publicApiKey = '7a46d725341fa87c7c6462b565da91b8';
const privateApiKey = '7693aa7a7540936c6f253a5f4cb99a5aae32f728';
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
    getHeroes (order, params){
        
        /* Busca os parâmetros enviados pela URL*/
        const getParams = new URLSearchParams(params);
        let paramsUrl = '';

        if(getParams){
            if(getParams.get('name')){
                paramsUrl += '&nameStartsWith=' + getParams.get('name');
            }

            if(getParams.get('page')){
                const offset = (parseInt(getParams.get('page')) - 1) * 24;
                paramsUrl += '&offset=' + offset;
            }
        }

        const url = 'characters?ts=' + timestamp + '&apikey=' + publicApiKey + '&hash=' + hash + '&limit=24' + paramsUrl;
        const filterOrder = '&orderBy=' + order;

        const intercep = api.interceptors.response.use(
            config => config,
            (error) => {
                return error;
            },
        );

        console.log(intercep);
        
        if(intercep.error !== undefined){
            return 'ECONNABORTED';
        } else {
            const resp = api.get(url + filterOrder);

            return resp;
        }
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