import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as alertifyjs from "alertifyjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  submitted = false;

  form !: FormGroup
  data:any;
  token:any;

  constructor( private http:HttpClient,
    private dataService:DataService,
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
    ){}


  loginForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  ngOnInit(){
    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
if(this.form.invalid){
  return;
}

this.dataService.login(this.form.value).subscribe(resp=>{
  this.data = resp;

  console.log(this.data);

  if(this.data.status === 1){
    this.token = this.data.data.token;
    localStorage.setItem('token', this.token);
    this.router.navigate(['/']);
    alertifyjs.success(JSON.parse(JSON.stringify(this.data.message)));

  }else if(this.data.status === 0){
    alertifyjs.error(JSON.parse(JSON.stringify(this.data.message)));

  }
})

  }


  show_password = false;
  showPassword(){
    if(this.show_password == false){
      this.show_password = true;
    }else{
      this.show_password = false;
    }
  }





}
