import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIConst } from '../shared/constants/api-const';
import { DataService } from '../shared/service/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css' ] // Corrected to styleUrls
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  companyId: string | null = null; 
  

  constructor(private dataService: DataService , private route: ActivatedRoute,private location: Location) {}

  subscriptions: Subscription[] = [];
  coordinate: any = [];
  isEditMode = false;
  companyData: any = {};


  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.getCoordinate();
    if (this.companyId) {
      this.viewCompany();
    }
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  getCoordinate(): void {  
    let coordinateSubscription = this.dataService.getData(APIConst.MAP_COORDINATE + this.companyData.companyAddress).subscribe({
      next: (response) => {
        if (response) {
          this.coordinate = response;
        } else {
          this.coordinate = [];
        }
      },
      error: err => {
        this.coordinate = [];
      }
    });
    this.subscriptions.push(coordinateSubscription);
  }

  viewCompany(): void { 

    let companyViewSubscription = this.dataService.getData(APIConst.VIEW_COMPANY + this.companyId).subscribe({
      next: (response) => {
        if (response) {
          this.companyData = response;
        }
      },
      error: (err) => {
        this.companyData = {};
        console.error('Error fetching company data', err);
      }
    });
    this.subscriptions.push(companyViewSubscription);
  }

  updateCompany(): void {
    if (this.companyId) {
      let updateSubscription = this.dataService.postData(APIConst.UPDATE_USER + this.companyId, this.companyData).subscribe({
        next: (response) => {
          console.log('Company updated successfully');
        },
        error: (err) => {
          console.error('Error updating company', err);
        }
      });
      this.subscriptions.push(updateSubscription);
    }
  }

  deleteCompany():
   void {}


  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  }


