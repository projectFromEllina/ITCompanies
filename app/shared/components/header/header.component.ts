import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Company} from '../../models/company.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isOpenMenu: boolean = false;

  @Input() company: Company;

  constructor(
    private readonly router: Router
  ) {
  }

  ngOnInit() {
  }

  get isSignIn(): boolean {
    return !!this.company;
  }

  goToAuthorization() {
    window.localStorage.clear();
    this.router.navigate(['authorization']);
  }
}
