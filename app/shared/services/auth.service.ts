import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Company} from "../models/company.model";

@Injectable({providedIn: 'root'})
export class AuthService {

  company: Company;

  private companies: Array<Company> = [];

  constructor(private http: HttpClient) {
  }

  createCompanies(company: Company) {
    if (!this.companies.some(c => c.name === company.name)) {
      company.id = this.companies.length;
      this.companies.push(company);
      this.sendCompanies().subscribe();
      this.setLocalSt(company);
      return true;
    }
    return;
  }

  signIn(company: Company) {
    if (this.companies.some(c => c.name === company.name && c.password === company.password)) {
      const createdCompany = this.companies.find(c => c.name === company.name);
      this.setLocalSt(createdCompany);
      return true;
    }
    return;
  }

  sendCompanies() {
    return this.http.put('https://it-companies-ad6e2.firebaseio.com/companies.json', this.companies.slice());
  }

  updateCompanies(company: Company) {
    this.allCompanies.subscribe(companies => {
      this.companies = companies;
      this.companies[company.id] = company;
      this.sendCompanies().subscribe();
    });
  }

  setAllCompanies() {
    this.allCompanies.subscribe(c => this.companies = c);
  }

  getCompany(): Company {
    return JSON.parse(window.localStorage.getItem('company'));
  }


  setLocalSt(company: Company): void {
    window.localStorage.setItem('company', JSON.stringify(company));
  }

  getIsOwnPage(name: string): boolean {
    if (!this.getCompany()) {
      return false;
    }

    return this.getCompany().name === name;
  }

  get allCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('https://it-companies-ad6e2.firebaseio.com/companies.json');
  }
}
