import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { CustomPromisify } from 'util';
import { observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
// import {AuthServiceJwt} from '../Common/sevice.auth.component';


@Injectable({
  providedIn: 'root'
})
export class SuitabilityService {
  public httpOptions : any;

  constructor(private _http : HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json; charset=utf-8',
          'Authorization-Token' : 'auth_Token'})
    }
   
  }

  public getProducts(baseUrl : string) {
    return this._http.get(baseUrl);
  };

  public doSearch (baseUrl : string, data :any){
    // const headers = new HttpHeaders().set('Content-Type', 'application/json')
    // .set('Authorization',`Bearer ${this.authServiceJwt.getToken}`);
    return this._http.get(baseUrl, data);
    // return this._http.get(baseUrl, data, this.httpOptions);
        // return this._http.get(baseUrl, data, {headers});

  }
}
