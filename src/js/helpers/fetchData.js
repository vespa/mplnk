import 'es6-promise';
import 'isomorphic-fetch';
import {ApiPath} from "config/Config"

const GetData =  ({lat, lng}) =>{
	const query = '?q='+lat+','+lng;
	return fetch(ApiPath+query)	
	.then(res => {
		if(res.status >= 400) throw new Error('Bad Response');
		return res.json();
	});
}

function fetchData(){
	return this;
}
fetchData.prototype.get = GetData;
export default new fetchData();




