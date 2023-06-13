import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/confirm.validator';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  form!:FormGroup;
  submitted = false;
  data: any;
  id:any;
  user:any;
  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder, private dataservice:DataService, private  toastr: ToastrService){}
  createForm(){
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]

  }, {
    Validator: MustMatch('password', 'confirmPassword')
  });
  }
  ngOnInit(): void{
    this.createForm();

    const routeParams = this.route.snapshot.paramMap;
    this.id = Number( routeParams.get('id'));
    this.dataservice.getUser(this.id).subscribe(
      (result)=>{
        this.user = JSON.parse(JSON.stringify(result))["data"];
        this.form = new FormGroup({

          password: new FormControl(),
          confirmPassword: new FormControl(),

        });
      }
    )
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;

    if(this.form.invalid){
      return;
    }

    this.dataservice.resetPassword(this.form.value, this.id).subscribe(res =>{
      this.data = res;
      //console.log(res);

      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true
        });
        this.submitted = false;
        this.form.get('password')?.reset();
        this.form.get('confirmPassword')?.reset();
      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true
        })
      }


    });

  }
}
