import { Component } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { APIConst } from '../shared/constants/api-const';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {

  companyForm: FormGroup = new FormGroup({
    companyName : new FormControl('',Validators.required),
    companyAddress : new FormControl('',Validators.required),
    coordinates: new FormGroup({
      latitude: new FormControl(11.354),
      longitude: new FormControl(34.45)
    })

  }); 

    constructor(private dataService: DataService) {}
  


  OnSumbit(){
    this.dataService.postData(APIConst.CREATE_COMPANY, this.companyForm.value)
      .pipe(
        catchError((err) => {
          console.error('Error creating Company', err);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('Company created successfully', response);
          }
        }
      });
  }


  get isFormValid() {
    return this.companyForm.valid;
  }
  
  }