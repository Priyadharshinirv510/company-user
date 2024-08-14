import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { APIConst } from '../shared/constants/api-const';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'] // Corrected property name
})
export class UserEditComponent implements OnInit , OnDestroy {
  userData: any = {};
  userId: string | null = null; 
  subscriptions: Subscription[] = [];


  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (this.userId) {
      this.viewUser();
    }
  }

  viewUser(): void {
    let userViewSubscription = this.dataService.getData(APIConst.VIEW_USER + this.userId).subscribe({
      next: (response) => {
        if (response) {
          this.userData = response;
        }
      },
      error: (err) => {
        this.userData = {};
        console.error('Error fetching user data', err);
      }
    });
    this.subscriptions.push(userViewSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
