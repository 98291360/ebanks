import { FormGroup } from "@angular/forms";


export function MustMatch(controlName:string, matchingcontrolName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingcontrol = formGroup.controls[matchingcontrolName];


    if(matchingcontrol.errors && !matchingcontrol.errors['mustMatch']){
      return;
    }


    if(control.value !== matchingcontrol.value){
      matchingcontrol.setErrors({ mustMatch:true });
    }else{
      matchingcontrol.setErrors(null);
    }
  }
}
