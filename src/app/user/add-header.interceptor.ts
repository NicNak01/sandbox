import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRepositoryService } from './user-repository.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log(`AddheaderInterceptor - ${req.url}`);
    const authService = this.injector.get(UserRepositoryService);
    const token: string = authService.getToken();
    const tokinazed: HttpRequest<any> = req.clone({
      setHeaders: { Authorization: 'Bearer ' + token }
      // setHeaders: {Authorization: auth_token}
      // setHeaders: {Authorization: 'Bearer ' + authService.getToken()}
    });
    return next.handle(tokinazed);
  }
}
