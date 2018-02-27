import 'es6-promise';
import 'isomorphic-fetch';
import {ApiPath} from "config/Config"

const GetData =  ({lat, long}) =>{
	const query = '?q='+lat+','+long;
	return fetch(ApiPath+query)	
	.then(res => {
		if(res.status >= 400) throw new Error('Bad Response');
		return res.json();
	});
}

export default GetData;