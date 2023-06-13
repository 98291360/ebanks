import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = "http://localhost:8000/"
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  login(body:any){
    return this.http.post(this.url+'api/login',body ,this.httpOptions);
  }

}
