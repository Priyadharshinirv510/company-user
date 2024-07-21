import { Component } from '@angular/core';
// import { DataService } from '../shared/service/data.service';
// import { APIConst } from '../shared/constants/api-const';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  user: any = { };

  constructor(
    //private dataService: DataService
    ) {}

  onSubmit() {
    // this.dataService.postData(APIConst.CREATE_USER,{}).subscribe({
    //   next: response => {
    //     console.log('User created successfully', response);
    //     // Optionally, reset the form after successful submission
    //     this.resetForm();
    //   },
    //   error: err => {
    //     console.error('Error creating user', err);
    //     // Handle error if needed
    //   }
    // });
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
      dateOfBirth: '',
      active: false
    };
  }
}