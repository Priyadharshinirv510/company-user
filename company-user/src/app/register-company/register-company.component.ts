import { Component } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { APIConst } from '../shared/constants/api-const';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {
  company: any = { };

  constructor(private dataService: DataService) {}

  onSubmitCompany() {
    this.dataService.postData(APIConst.CREATE_USER, this.company).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        // Optionally, reset the form after successful submission
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating user', err);
        // Handle error if needed
      }
    });
  }

  resetForm() {
    this.company = {
      companyName: '',
      companyAddress: '',
    };
  }
}

