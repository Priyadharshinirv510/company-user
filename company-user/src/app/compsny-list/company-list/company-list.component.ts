import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/service/data.service';
import { APIConst } from '../../shared/constants/api-const';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companyList: any = [];
  filteredCompanyList: any = [];
  subscriptions: Subscription[] = [];
  searchResult: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCompanyList();
  }

  getCompanyList() {
    let companyListSubscription = this.dataService.getData(APIConst.COMPANY_LIST).subscribe({
      next: (response) => {
        if (response) {
          this.companyList = response;
          this.filteredCompanyList = response;
        } else {
          this.companyList = [];
          this.filteredCompanyList = [];
        }
      },
      error: err => {
        this.companyList = [];
        this.filteredCompanyList = [];
      }
    });
    this.subscriptions.push(companyListSubscription);
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;
  
    if (searchValue) {
      this.filteredCompanyList = this.companyList.filter((company: { companyId: any }) =>
        company.companyId && company.companyId.toString() === searchValue
      );
      this.searchResult = this.filteredCompanyList.length === 1 ? this.filteredCompanyList[0] : null;
      
      // if (this.filteredCompanyList.length === 1) {
      //   this.filteredCompanyList = null;
      // }
    } else {
      this.filteredCompanyList = this.companyList;
      this.searchResult = null;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
