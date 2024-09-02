import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { APIConst } from '../shared/constants/api-const';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'], // Corrected property name
  providers: [DatePipe]
})
export class UserEditComponent implements OnInit , OnDestroy {
  userData: any = {};
  userId: string | null = null; 
  subscriptions: Subscription[] = [];
  isEditMode = false;




  constructor(private dataService: DataService, private route: ActivatedRoute, private datePipe: DatePipe , private location: Location) {}

  ngOnInit(): void {
    // console.log(this.userData.dob)
    this.userId = this.route.snapshot.paramMap.get('userId');
   
    if (this.userId) {
      this.viewUser();
    }
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  viewUser(): void {
    let userViewSubscription = this.dataService.getData(APIConst.VIEW_USER + this.userId).subscribe({
      next: (response) => {
        if (response) {
          this.userData = response;
          const date = new Date(this.userData.dob);
          this.userData.dob = this.datePipe.transform(date, 'yyyy-MM-dd');
        }
      },
      error: (err) => {
        this.userData = {};
        console.error('Error fetching user data', err);
      }
    });
    this.subscriptions.push(userViewSubscription);
  }

  updateUser(): void {
    if (this.userId) {
      let updateSubscription = this.dataService.putData(APIConst.UPDATE_USER, this.userData).subscribe({
        next: (response) => {
          console.log('User updated successfully');
        },
        error: (err) => {
          console.error('Error updating user', err);
        }
      });
      this.subscriptions.push(updateSubscription);
    }
  }


  
  deleteUser():
   void {
  //   if (this.userId) {
  //     let deleteSubscription = this.dataService.postData(APIConst.DELETE_USER + this.userId).subscribe({
  //       next: (response) => {
  //         console.log('User deleted successfully');
  //       },
  //       error: (err) => {
  //         console.error('Error deleting user', err);
  //       }
  //     });
  //     this.subscriptions.push(deleteSubscription);
  //   }
  }


  goBack(): void {
    this.location.back();
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
