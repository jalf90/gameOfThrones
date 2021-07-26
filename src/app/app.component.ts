import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn: Observable<boolean>;

  constructor(private _route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isUserLoggedIn;
    this.isUserLoggedIn.subscribe((res) => {
      if (!res) {
        this._route.navigate(['/login']);
      }
    })
  }
}
