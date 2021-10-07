import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login } from '../shared/models/login/login';
import { AlertifyService } from '../shared/serivces/basic/alertify/alertify.service';
import { StorageService } from '../shared/serivces/basic/storage/storage.service';
import { LoginService } from '../shared/serivces/custom/login/login.service';
import { DcValidation } from '../shared/utilities/dc-validation';

@Component({
  selector: 'parent-aps-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private alertify: AlertifyService,
    private storage: StorageService
  ) {}
  // #region
  form: FormGroup;

  loginObject = {} as Login;

  formErrors = {} as Login;

  validationMessages: any;

  mapFormValues() {
    this.loginObject.email = this.form.value.username;
    this.loginObject.password = this.form.value.password;
  }
  // #endregion

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.form.valueChanges.subscribe((data) => {
      DcValidation.logValidationErrors(
        this.form,
        this.formErrors,
        this.validationMessages
      );
    });
  }

  login() {
    this.spinner.show();
    this.mapFormValues();
    this.loginService.login(this.loginObject).subscribe(
      (user) => {
        this.storage.setItem('token', user.token);
        this.alertify.success('logged in Successfully.');
      },
      (err) => {
        this.spinner.hide();
        this.alertify.error(err.error.error);
      },
      () => {
        this.spinner.hide();
        this.router.navigate(['/enquire']);
      }
    );
  }
}
