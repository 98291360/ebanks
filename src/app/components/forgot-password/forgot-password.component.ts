import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  form!:FormGroup;
  submitted = false;
  data: any;
  constructor( private formBuilder: FormBuilder, private dataservice:DataService, private  toastr: ToastrService,     private router:Router
    ){}
  forgotForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],


  });
  }
  ngOnInit(): void{
    this.forgotForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;

    if(this.form.invalid){
      return;
    }

    this.dataservice.forgotPassword(this.form.value).subscribe(res =>{
      this.data = res;
      console.log(this.data.data.id);

      if(this.data.status === 1){
        this.router.navigate(['/reset-password/'+this.data.data.id]);
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut:50000,
        });
      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut:50000,
        })
      }

      this.submitted = false;
      this.form.get('email')?.reset();

    });
  }

}
