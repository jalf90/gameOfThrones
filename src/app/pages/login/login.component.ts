import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credential } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public hide = true;
  public hasLoginFailed = false;
  public loginSubscription: Subscription;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginSubscription = this.authService.isUserLoggedInAfterClick.subscribe(res => {
      this.hasLoginFailed = !res
    });
  }

  ngOnInit() {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public isFieldInvalid(field: string) { // {6}
    return (
      (this.form && !this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form && this.form.get(field)?.untouched)
    );
  }

  public login(): void {
    if (this.form.valid) {
      const credential: Credential = {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value
      }
      this.authService.login(credential);
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
