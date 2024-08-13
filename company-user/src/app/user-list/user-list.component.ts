import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { Subscription } from 'rxjs';
import { APIConst } from '../shared/constants/api-const';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  userList: any = [];
  filteredUserList: any = [];
  subscriptions: Subscription[] = [];
  searchUserId: string = '';
  searchResult: any = null; 

  constructor(private dataService: DataService , private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    let userListSubscription = this.dataService.getData(APIConst.USERS_LIST).subscribe({
      next: (response) => {
        if (response) {
          this.userList = response;
          this.filteredUserList = response;
        } else {
          this.userList = [];
          this.filteredUserList = [];
        }
      },
      error: err => {
        this.userList = [];
        this.filteredUserList = [];
      }
    });
    this.subscriptions.push(userListSubscription);
  }

  filterUserList() {
    if (this.searchUserId) {
      this.filteredUserList = this.userList.filter((user: { userId: any }) => 
        user.userId && user.userId.toString() === this.searchUserId
    );
      this.searchResult = this.filteredUserList.length === 1 ? this.filteredUserList[0] : null;
      // if (this.filteredUserList.length === 1){
      //   this.filteredUserList = null
      // }
    } else {
      this.filteredUserList = this.userList;
      this.searchResult = null;
    }
  }

  navigateToUserDetail(userId: any) {
    this.router.navigate([`/users/getUserById/${userId}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
