import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
    path:'login', component: LoginComponent
  },

  {
    path:'', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile', component: ProfileComponent
  },

  {
    path:'register', component: RegisterComponent
  },
  {
    path:'forgot-password', component: ForgotPasswordComponent
  },
  {
    path:'reset-password/:id', component: ResetPasswordComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
