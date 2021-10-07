import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  
    let token = localStorage.getItem("token");

    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(jsonReq);
  }
}
