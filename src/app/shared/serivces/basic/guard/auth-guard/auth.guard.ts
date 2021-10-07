import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { LoginService } from "../../../custom/login/login.service";
// import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
     private loginService: LoginService,
     private router: Router,
  ) {}

  canActivate(): boolean {
   if (this.loginService.loggedIn()) {
     return true;
   }  
    this.router.navigate(["/login"]);
    return false;
  }

  
}
