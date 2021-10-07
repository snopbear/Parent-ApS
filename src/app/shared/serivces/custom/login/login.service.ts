import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from 'src/app/shared/models/login/login';
import { RootService } from '../../basic/root/root.service';
import { StorageService } from '../../basic/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  endPoints = {
    login: 'login',
  };

  jwtHelper = new JwtHelperService();

  constructor(
    private rootService: RootService,
    private storage: StorageService
  ) { }

  login(loginModel: Login) {
    return this.rootService.postRoot(this.endPoints.login, loginModel);
  }
  loggedIn() {
    let value;
    const token = this.storage.getToken();
    if (token) { value = true;} else {value = false;}
    return value;
  }
}
