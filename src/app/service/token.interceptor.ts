import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        if (err instanceof HttpErrorResponse && this.router.url !== '/status' && (err.status === 404 || err.status === 503 || err.status === 0)) {
            console.log(err);
            this.router.navigate(['/status'], { queryParams: { redirect: true }});
            return throwError(err);
        } else if (err instanceof HttpErrorResponse && this.router.url !== '/login' && err.status === 401) {
            this.auth.logout()
                .subscribe({
                    error: (authErr: any) => this.notificationService.error('Error Occurred!', 'Error'),
                    complete: () => this.router.navigate(['/login'])
                });
            return Observable.empty();
        }
        return throwError(err);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isTranslate = request.url.includes('i18n');
        if (isTranslate) {
            return next.handle(request);
        } else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                },
                url: environment.BASE_URL + '/api/v2/' + request.url
            });
            return next.handle(request).catch(x => this.handleAuthError(x));
        }
    }
}