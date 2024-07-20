import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'createCompany', component: RegisterCompanyComponent },
  { path: 'createUser', component: RegisterUserComponent },
  { path: 'aboutUs', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
