import {Component, OnInit} from '@angular/core';
import {Company} from "../../shared/models/company.model";
import {AuthService} from "../../shared/services/auth.service";
import {ScreenState, WindowSizeReaderService} from '../../shared/services/window-size-reader.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.less']
})
export class AllCompaniesComponent implements OnInit {
  searchName: string = '';
  numberOfLetters: number;
  isWrongUrlImg: boolean = true;
  isShowLoader: boolean = true;
  companies: Company[] = [];
  filterCompanies: Company[] = [];

  constructor(private readonly authService: AuthService,
              private readonly windowSizeReaderService: WindowSizeReaderService) {
  }

  ngOnInit() {
    this.load();
  }

  private load(): void {
    this.authService.allCompanies.subscribe(c => {
      this.companies = c;
      this.filterCompanies = this.companies;
      this.isShowLoader = false;
    });

    this.numberOfLetters = this.windowSizeReaderService.screenState === ScreenState.mobile
      ? 100 : 300;
  }

  onSearchCompany(): void {
    if (!this.searchName.length) {
      this.filterCompanies = this.companies;
    }

    this.filterCompanies = this.companies.filter(e =>
      e.name.toLowerCase().indexOf(this.searchName.toLowerCase()) !== -1);
  }

  onCloseSearching(): void {
    this.searchName = '';
    this.onSearchCompany();
  }
}
