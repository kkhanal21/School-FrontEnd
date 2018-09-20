import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Constants } from "../helper/constants";

// declare var jquery: any;
declare var $: any;

//this is generic http custom class where we are definig our own http method which is
//extended by all the other service classes
@Injectable()
export class HttpService {

    //remember we get the home_url from the constant class in helper folder
    constructor(private http: Http) { }

    get(url) {
        return this.http.get(Constants.HOME_URL + url);
    }

    post(url, payload) {
        return this.http.post(Constants.HOME_URL + url, payload);
    }

    put(url, id, payload) {
        return this.http.put(Constants.HOME_URL + url + '/' + id, payload);
    }

    delete(url, id) {
        return this.http.delete(Constants.HOME_URL + url + '/' + id);
    }

}
