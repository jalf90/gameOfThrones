import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Credential } from '../models/credentials';
import credentialsJson from '../assets/login-credentials.json';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(window.sessionStorage.getItem('userLogged') ? true : false);
  private loggedInAfterClick = new ReplaySubject<boolean>();
  private credentials: Credential[] = credentialsJson;

  get isUserLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isUserLoggedInAfterClick() {
    return this.loggedInAfterClick.asObservable();
  }

  constructor(private router: Router) { }

  login(credential: Credential) {
    const user = this.credentials.find(u => u.username === credential.username);
    if (user && user.password === credential.password) {
      this.loggedIn.next(true);
      this.loggedInAfterClick.next(true);
      window.sessionStorage.setItem('userLogged', 'true');
      this.router.navigate(['/']);
    }
    else {
      this.loggedIn.next(false);
      this.loggedInAfterClick.next(false);
    }
  }
}

