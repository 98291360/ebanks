import { DatePipe } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { Injectable } from '@angular/core';
import * as alertifyjs from "alertifyjs";


@Injectable({
  providedIn: 'root'
})

 export class ClientServices{
  id:any;
  hideSpinner:any;
  data:any;
  token:any;
  userData:any;
  name:any;
  email:any;
  clients:any;
  comptes:any;
  operations:any;
  submitted = false;
  dateOperation:any;
  consulterCompteModal:any;
  retraitSignatureModal:any;
  consulterHistoriqueModal = false;
  admin:any;
  num_compte:any;
  type:any;
  clientsWithouCompte:any;
  solde:any;
  created_at:any;
  etat:any;
  datePipe = new DatePipe("en-US");
  versementSignatureModal:any
  nombres:any;
  ClientUpdateModal: any;
  versementChart:any;
  retraitChart:any;
  myDate:any
  typeOperation:any;
  dtoptions:DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject<any>();
  UpdateSignatureModal:any;

  constructor( private spinner:NgxSpinnerService, private router: Router,  private formBuilder: FormBuilder, private dataservice:DataService, private  toastr: ToastrService
    ){ }

    Clientform = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      adresse: new FormControl(),
      telephone: new FormControl(),
    });


  get fcUp(){
    return this.Clientform.controls;

  }


  deleteClient(id:any){
    alertifyjs.confirm("Suppréssion", "Voulez-vraiment le supprimer ?", () =>{
    this.id = id;
    console.log(this.id);
       this.spinner.show();
       this.hideSpinner =  setTimeout(() => {
         /** spinner ends after 5 seconds */
         this.spinner.hide();
         this.hideSpinner = false;
         if(!this.hideSpinner){

           this.dataservice.deleteClient(this.id).subscribe(
             (result)=>{
               this.data = result;

               if(this.data.status === 1){
                 this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
                   timeOut:2000,
                   progressBar:false
                 });
               }
               this.router.navigate(['/home']);

             }
           );
         }
       },500);
    },
    () => alertifyjs.error("Erreur de Suppréssion!")
    )



   }

  


 }
