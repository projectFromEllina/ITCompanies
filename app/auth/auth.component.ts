import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from "../shared/models/company.model";
import {AuthService} from "../shared/services/auth.service";
import { Router } from '@angular/router';
import {of} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  char: number = 5;
  company: Company;
  isLoginMode: boolean = false;
  isLogin: boolean;
  isShowError: boolean = false;
  isShowLoader: boolean = false;

  constructor(private readonly authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.setAllCompanies();

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.char)])
    });
  }

  onSubmit() {
    this.isShowLoader = true;

    this.company = {
      name: this.form.value.name.trim(),
      password: this.form.value.password
    } as Company;
    this.isLogin = this.isLoginMode
      ? this.authService.createCompanies(this.company)
      : this.authService.signIn(this.company);

    of(null).pipe(
      delay(1000)
    ).subscribe(() => {
      this.isShowLoader = false;
      if (this.isLogin) {
        this.router.navigate(['/company', this.company.name]);
      }
      this.isShowError = true;
    });

    this.form.reset();
  }

  onSwitchMode(): void {
    this.isShowError = false;
    this.isLoginMode = !this.isLoginMode;
  }

}
