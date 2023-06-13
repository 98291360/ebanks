import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url:string = "http://localhost:8000/"
  constructor( private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };
//User Request
  registerUser(data:any){
    return this.http.post(this.url+'api/register', data, this.httpOptions);
  }

  login(data:any){
    return this.http.post(this.url + 'api/login/', data);
  }

  resetPassword(data:any, id:any){
    return this.http.put(this.url+'api/resetPassword/'+id, data);
  }
  forgotPassword(data:any){
    return this.http.post(this.url+'api/forgotPassword', data);
  }

  getUser(id:any){
    return this.http.get(this.url+'api/getUser/'+id);
  }

  //Clients Request

  getClient(){
    return this.http.get(this.url+'api/getClient');
  }

  getOneClient(id:any){
    return this.http.get(this.url+'api/getOneClient/'+id);
  }


  addClient(data:any){
    return this.http.post(this.url+'api/addClient', data);
  }


  updateSignature(data:any){
    return this.http.post(this.url+'api/updateSignature', data);
  }


  updateClient(data:any, id:any){
    return this.http.put(this.url+'api/updateClient/'+id, data);
  }


  getClientWithoutCompte(){
    return this.http.get(this.url+'api/getClientWithoutCompte');
  }

  consulterCompte(data:any){
    return this.http.post(this.url+'api/consulterCompte', data, this.httpOptions);
  }
  deleteClient(id:any){
    return this.http.delete(this.url+'api/deleteClient/'+id);
  }


  //Operation Request
  AddOperation(data:any){
    return this.http.post(this.url+'api/addOperation', data);
  }
  getOperation(){
    return this.http.get(this.url+'api/getOperation');
  }

  HistoriqueOperation(data:any){
    return this.http.post(this.url+'api/consulterOperation', data);
  }

  //Compte Request
  getCompte(){
    return this.http.get(this.url+'api/getCompte');
  }

  addCompte(data:any){
    return this.http.post(this.url+'api/addCompte', data);
  }

  getOneCompte(id:any){
    return this.http.get(this.url+'api/getOneCompte/'+id);
  }

  updateCompte(data:any, id:any){
    return this.http.put(this.url+'api/updateCompte/'+id, data);
  }

}
