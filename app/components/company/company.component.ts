import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {ActivatedRoute} from '@angular/router';
import {Company} from '../../shared/models/company.model';
import {AuthService} from '../../shared/services/auth.service';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent implements OnInit {
  company: Company;
  name: string;
  isEditMode: boolean = false;
  isLoadImg: boolean = true;
  isOwnPage: boolean;
  isShowLoader: boolean = true;

  private subscription = new Subscription();

  constructor(private readonly authService: AuthService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription.add(this.route.params.pipe(
      switchMap(params => {
        this.name = params['name'];
        return this.authService.allCompanies
      })).subscribe(companies => {
        this.company = companies.find(c => c.name === this.name);
        this.isOwnPage = this.authService.getIsOwnPage(this.name);
        this.isShowLoader = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSave(): void {
    this.authService.updateCompanies(this.company);
    this.authService.setLocalSt(this.company);
    this.isEditMode = false;
  }

  onClose(): void {
    this.isEditMode = false;
    this.setMyCompany();
  }

  onLoadImg(load: boolean): void {
    this.isLoadImg = load;
  }

  setMyCompany(): void {
    this.authService.allCompanies.subscribe(companies => {
      this.company = companies.find(c => c.name === this.name);
    })
  }

  get isValidEditInfo(): boolean {
    return !!(this.company.about || this.company.img);
  }
}
