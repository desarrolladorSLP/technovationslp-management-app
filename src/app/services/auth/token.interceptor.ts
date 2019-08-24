import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private  authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isAuthenticated()) {
      return next.handle(req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.authService.getLoggedUser().access_token}`)
      }));
    }


    return next.handle(req);
  }
}
