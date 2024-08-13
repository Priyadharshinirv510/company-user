import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserListComponent } from './user-list/user-list.component';
import { CompanyListComponent } from './compsny-list/company-list/company-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'createCompany', component: RegisterCompanyComponent },
  { path: 'createUser', component: RegisterUserComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  {path: 'userlist', component : UserListComponent},
  {path: 'companylist', component : CompanyListComponent},
  { path: 'users/getUserById/:userId', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
