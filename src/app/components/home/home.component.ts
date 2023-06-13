import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js/auto';
import { Subject } from 'rxjs';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ClientServices } from '../functions/client/client.component';
import * as alertifyjs from "alertifyjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],


})
export class HomeComponent {
  token:any;
  connexion:any;
  userData:any;
  name:any;
  email:any;
  clients:any;
  comptes:any;
  operations:any;
  submitted = false;
  data:any;
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
  id:any;
  versementChart:any;
  retraitChart:any;
  myDate:any
  typeOperation:any;
  hideSpinner:any;
  dtoptions:DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject<any>();
  UpdateSignatureModal:any;
  consulterCompteform = new FormGroup({

    num_compte:  new FormControl('', Validators.required),
    signature: new FormControl('', Validators.required),
});


versementForm = new FormGroup({

  type:  new FormControl('Versement'),
  montant: new FormControl('',  Validators.required),
  num_compte:  new FormControl('', Validators.required),
  signature: new FormControl('',Validators.required),

});
RetraitForm = new FormGroup({

  type:  new FormControl('Retrait'),
  montant: new FormControl('',  Validators.required),
  num_compte:  new FormControl('', Validators.required),
  signature: new FormControl('',Validators.required),

});

addClientForm = new FormGroup({

  name:  new FormControl('', Validators.required),
  adresse: new FormControl('',  Validators.required),
  telephone:  new FormControl('', Validators.required),
  signature: new FormControl('',Validators.required),

});

addCompteForm = new FormGroup({

  client_id:  new FormControl('', Validators.required),
  type: new FormControl('',  Validators.required),

});


Clientform = new FormGroup({
  id: new FormControl(),
  name: new FormControl(),
  adresse: new FormControl(),
  telephone: new FormControl(),
});

Compteform = new FormGroup({
  id: new FormControl(),
  type: new FormControl(),
  num_compte: new FormControl(),
  client_id: new FormControl(),
  etat: new FormControl(),
});


//Print Page Function
printThisPage() {
  window.print();
}


//consulterComptePopup
  displayStyle = "none";
  openPopup(){
    this.displayStyle = "block"
  }
  closePopup(){
    this.displayStyle = "none";

  }
//consulterHistoriqueModal
openconsulterHistoriqueModalPopup(){
  this.displayStyle = "block";

}
closeconsulterHistoriqueModalPopup(){
  this.displayStyle = "none";

}





  constructor(private client:ClientServices, private spinner:NgxSpinnerService, private router: Router,  private formBuilder: FormBuilder, private dataservice:DataService, private  toastr: ToastrService
    ){
      Chart.register(...registerables);
    }

  ngOnInit(){
    this.myDate  = this.datePipe.transform(new Date(), 'yyyy');
    this.dtoptions = {
      pagingType: 'full_numbers',
      retrieve: true,
    };



    this.listClient();
    this.listCompte();
    this.listOperation();
    this.getClientWithoutCompte();
    this.updateClient;

    this.token = localStorage.getItem('token');
    this.userData = jwtDecode(this.token);
    this.name = this.userData.name;
    this.email = this.userData.email;
    console.log(this.userData);
    if(this.userData == false){
      this.connexion = false;
    }else{
      this.connexion = true;
    }

    if(this.userData.email=="ousmane@gmail.com"){
      this.admin = true;


    //Chart Start

      this.dataservice.getOperation().subscribe(
        (result)=>{
          this.data = result;
          this.type = this.data.chartOperations.map((operation: any) => operation.date_operation);
          this.dateOperation = this.data.data.map((operation: any) => operation.nombre);
          this.typeOperation = this.data.DateOperation.map((operation: any) => operation.date_operation);
          this.retraitChart = this.data.data1.map((operation: any) =>  operation.versements);

          console.log(this.retraitChart);


    var myChart = new Chart("myChart", {
      type: 'pie',
      data: {
          labels: this.type,

          datasets: [
            {
              label: 'Operations Par Date',
              data: this.dateOperation,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 3
          },


        ]
      },


      options: {
        aspectRatio:2.5,
        responsive: true,
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100
          }
        }
      },


  });
    // LineChart END*/

    var myLineChart = new Chart("myLineChart", {
      type: 'bar',
      data: {
          labels: ["Retraits", "Versements"],

          datasets: [
            {
              data: this.retraitChart,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 3
          },


        ]
      },


      options: {
        aspectRatio:2.5,
        responsive: true,
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100
          }
        },
      },



  });

    //Chart END*/

        }
        );


    }



  }

  /*filterList = {
      operation : this.typeOperation
  }

  filterChange(appliedfilters) {
    console.log(appliedfilters);

  }*/




  logout(){
    localStorage.removeItem('token');
    this.connexion == false;
    this.router.navigate(['/login']);
  }


  get f(){
    return this.consulterCompteform.controls;

  }


  get fr(){
    return this.RetraitForm.controls;

  }
  get fv(){
    return this.versementForm.controls;

  }
  get fc(){
    return this.addClientForm.controls;

  }

  get fcUp(){
    return this.Clientform.controls;

  }

  get fct(){
    return this.addCompteForm.controls;

  }

  get fCup(){
    return this.Compteform.controls;

  }


  RetraitSignatureSubmit(){
    this.submitted = true;

    if(this.RetraitForm.invalid){
      return;
    }
    this.spinner.show();

    this.hideSpinner =  setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
       this.hideSpinner = false;

       if(!this.hideSpinner){
        this.dataservice.AddOperation(this.RetraitForm.value).subscribe(res =>{
          this.data = res;
          console.log(res);


          if(this.data.status === 1){

            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.RetraitForm.get('num_compte')?.reset();
            this.RetraitForm.get('signature')?.reset();
            this.RetraitForm.get('montant')?.reset();

          }else{
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }

          this.router.navigate(['']);
          this.ngOnInit();

        });
       }
    },500)



  }


  VersementSignatureSubmit(){
    this.submitted = true;

    if(this.versementForm.invalid){
      return;
    }

    this.spinner.show();
    this.hideSpinner =  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.hideSpinner = false;
      if(!this.hideSpinner){
        this.dataservice.AddOperation(this.versementForm.value).subscribe(res =>{
          this.data = res;
          console.log(res);

          if(this.data.status === 1){
            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.versementForm.get('num_compte')?.reset();
            this.versementForm.get('signature')?.reset();
            this.versementForm.get('montant')?.reset();



          }else{
            this.retraitSignatureModal=false;
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }
          this.router.navigate(['']);
          this.ngOnInit();

        });
      }
    },500);


  }



  addClientSubmit(){
    this.submitted = true;

    if(this.addClientForm.invalid){
      return;
    }

    this.spinner.show();
    this.hideSpinner =  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.hideSpinner = false;
      if(!this.hideSpinner){
        this.dataservice.addClient(this.addClientForm.value).subscribe(res =>{
          this.data = res;
          console.log(res);

          if(this.data.status === 1){
            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.addClientForm.get('name')?.reset();
            this.addClientForm.get('signature')?.reset();
            this.addClientForm.get('adresse')?.reset();
            this.addClientForm.get('telephone')?.reset();



          }else{
            this.retraitSignatureModal=false;
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }

          this.router.navigate(['']);
          this.ngOnInit();

        });
      }
    },500);


  }

  addCompteSubmit(){
    this.submitted = true;

    if(this.addCompteForm.invalid){
      return;
    }
    this.spinner.show();
    this.hideSpinner =  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.hideSpinner = false;
      if(!this.hideSpinner){
        this.dataservice.addCompte(this.addCompteForm.value).subscribe(res =>{
          this.data = res;
          console.log(res);

          if(this.data.status === 1){
            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.addCompteForm.get('type')?.reset();
            this.addCompteForm.get('client_id')?.reset();




          }else{
            this.retraitSignatureModal=false;
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }
          this.router.navigate(['']);
          this.ngOnInit();

        });
      }
    },500);


  }






 consulterComptesubmit(){





    this.submitted = true;

    if(this.consulterCompteform.invalid){
      return;
    }



      this.spinner.show();

     this.hideSpinner =  setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.hideSpinner = false;

        if(!this.hideSpinner) {


          this.dataservice.consulterCompte(this.consulterCompteform.value).subscribe(res =>{
            this.data = res;




            if(this.data.status === 1){
              this.consulterCompteModal = true;
              this.num_compte = this.data.data.num_compte;
              this.solde = this.data.data.solde;
              this.type = this.data.data.type;

              this.created_at = this.datePipe.transform(this.data.data.created_at, 'dd/MM/yyyy');
              this.etat = this.data.data.etat;
              this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
                timeOut:2000,
                progressBar:false
              });

              this.submitted = false;
              this.consulterCompteform.get('num_compte')?.reset();
              this.consulterCompteform.get('signature')?.reset();
            }else{
              this.consulterCompteModal=false;
              this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
                timeOut:2000,
                progressBar:false
              })
            }



          });
        }
      }, 500);















  }

  SignatureUpdatesubmit(){
    this.submitted = true;

    if(this.consulterCompteform.invalid){
      return;
    }
    this.spinner.show();
    this.hideSpinner =  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.hideSpinner = false;
      if(!this.hideSpinner){
        this.dataservice.updateSignature(this.RetraitForm.value).subscribe(res =>{
          this.data = res;

          if(this.data.status === 1){
            this.UpdateSignatureModal = true;

            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.RetraitForm.get('num_compte')?.reset();
            this.RetraitForm.get('signature')?.reset();

          }else{
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }



        });
      }
    },500);


  }


 consulterHistoriquesubmit(){
  this.submitted = true;

  if(this.consulterCompteform.invalid){
    return;
  }
  this.spinner.show();
    this.hideSpinner =  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.hideSpinner = false;
      if(!this.hideSpinner){
        this.dataservice.HistoriqueOperation(this.consulterCompteform.value).subscribe(res =>{
          this.data = res;

          if(this.data.status === 1){
            this.consulterHistoriqueModal = true;
            console.log(this.data.data);
            this.operations  = JSON.parse(JSON.stringify(this.data.data));
            console.log(this.operations);
            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.consulterCompteform.get('num_compte')?.reset();
            this.consulterCompteform.get('signature')?.reset();
          }else{
            this.consulterCompteModal=false;
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }



        });
      }
    },500);


}


  listClient(){
    this.dataservice.getClient().subscribe(
      (result)=>{
        this.clients  = JSON.parse(JSON.stringify(result))["clients"];
        this.dtTrigger.next(null);


      }
      );
  }


  listCompte(){
    this.dataservice.getCompte().subscribe(
      (result)=>{
        this.comptes  = JSON.parse(JSON.stringify(result))["comptes"];
        this.dtTrigger.next(null);


      }
      );
  }

  listOperation(){
    this.dataservice.getOperation().subscribe(
      (result)=>{
        this.data = result;
        this.dtTrigger.next(null);
        this.operations  = JSON.parse(JSON.stringify(this.data.operations));
        this.nombres  = JSON.parse(JSON.stringify(this.data.data));
        console.log(this.operations);

      }
      );
  }

  getClientWithoutCompte(){
    this.dataservice.getClientWithoutCompte().subscribe(
      (result)=>{
        this.data = result;
        this.clientsWithouCompte  = JSON.parse(JSON.stringify(this.data.Clients));
        console.log(this.data.Clients);

      }
      );
  }

  updateClient(id:any){
    console.log(id);
    return this.dataservice.getOneClient(id).subscribe(
      (result)=>{
        this.data = result;
        console.log(this.data.data.name)

        if(JSON.stringify(this.data.code === 200)){
          this.ClientUpdateModal = true;
          this.data = JSON.parse(JSON.stringify(this.data.data));

          this.Clientform = new FormGroup({
            id: new FormControl(this.data.id),
            name: new FormControl(this.data.name, Validators.required),
            adresse: new FormControl(this.data.adresse, Validators.required),
            telephone: new FormControl(this.data.telephone, Validators.required),
          });
        }

      }
    )

  }

  updateClientSubmit(){
    this.submitted = true;

    if(this.Clientform.invalid){
      return;
    }
    this.spinner.show();
    this.hideSpinner =  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.hideSpinner = false;
      if(!this.hideSpinner){
        this.id = this.data.id;
        this.dataservice.updateClient(this.Clientform.value, this.id).subscribe(res =>{
          this.data = res;
          console.log(res);

          if(this.data.status === 1){
            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.Clientform.get('name')?.reset();
            this.Clientform.get('adresse')?.reset();
            this.Clientform.get('telephone')?.reset();



          }else{
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }

          this.router.navigate(['']);

          this.ngOnInit();

        });
      }
    },500);

  }


  updateCompte(id:any){
    console.log(id);

        this.dataservice.getOneCompte(id).subscribe(
          (result)=>{
            this.data = result;
            console.log(this.data.data.name)

            if(JSON.stringify(this.data.code === 200)){
              this.ClientUpdateModal = true;
              this.data = JSON.parse(JSON.stringify(this.data.data));

              this.Compteform = new FormGroup({
                id: new FormControl(this.data.id),
                num_compte: new FormControl(this.data.num_compte),
                client_id: new FormControl(this.data.client_id),
                type: new FormControl(this.data.type, Validators.required),
                etat: new FormControl(this.data.etat, Validators.required),
              });
            }

          }
        )

  }

  updateCompteSubmit(){
    this.submitted = true;

    if(this.Compteform.invalid){
      return;
    }
    this.spinner.show();
    this.hideSpinner =  setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.hideSpinner = false;
      if(!this.hideSpinner){
        this.id = this.data.id;
        this.dataservice.updateCompte(this.Compteform.value, this.id).subscribe(res =>{
          this.data = res;
          console.log(res);

          if(this.data.status === 1){
            this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            });

            this.submitted = false;
            this.Compteform.get('type')?.reset();
            this.Compteform.get('etat')?.reset();



          }else{
            this.retraitSignatureModal=false;
            this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut:2000,
              progressBar:false
            })
          }
          this.router.navigate(['']);
          this.ngOnInit();
        });
      }
    },500);


  }

  deleteClient(id:any){
 this.client.deleteClient(id);
 this.ngOnInit();
  }


}

