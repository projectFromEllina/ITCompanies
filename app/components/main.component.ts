import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {Company} from "../shared/models/company.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {
  company: Company;


  constructor (private readonly router: Router,
               private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.company = this.authService.getCompany();
    if(this.router.url === '/') {
        this.router.navigate(!this.company
          ? [`/companies`]
          : [`/company/${this.company.name}`]);
    }
  }
}
