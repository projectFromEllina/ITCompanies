import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
  }

  get textBtn(): string {
    return this.authService.getCompany() ? 'My company' : 'All companies'
  }

}
