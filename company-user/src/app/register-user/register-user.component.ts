import { Component } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { APIConst } from '../shared/constants/api-const';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  user: any = { };

  constructor(private dataService: DataService) {}

  onSubmit() {
    this.dataService.postData(APIConst.CREATE_USER, this.user)
      .pipe(
        catchError((err) => {
          console.error('Error creating User', err);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('User created successfully', response);
          }
        }
      });
  }
}