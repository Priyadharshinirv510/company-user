import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyListComponent } from './compsny-list/company-list/company-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    LandingComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    UserListComponent,
    CompanyListComponent,
    UserEditComponent,
    CompanyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
