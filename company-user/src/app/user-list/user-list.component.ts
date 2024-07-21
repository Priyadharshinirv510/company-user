import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { Subscription } from 'rxjs';
import { APIConst } from '../shared/constants/api-const';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  userList: any = [];
  subscriptions: Subscription[] = [];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getUserList() ;
  }
  getUserList() {
    let userListSubscription = this.dataService.getData(APIConst.USERS_LIST).subscribe({
        next: response => {
          if (response){
            this.userList = response
          }
          else {
            this.userList = []
          }
         
        },
        error: err => {
          
        }
      });
      this.subscriptions.push(userListSubscription);

    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
