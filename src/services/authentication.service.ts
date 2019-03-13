import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/internal/operators";
import {throwError} from "rxjs/index";
import {AlertService} from "../directives/alerts/alerts.service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationService {

    constructor(private router: Router,
                private http: HttpClient,
                private alertService: AlertService) {
    }

    login(email: string, password: string) {
        AuthenticationService.setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjRiZTE3ODFmLWVhYTktNDVkNC1iMjQ0LTQzMjIwODFmOWI1NyIsImlhdCI6MTU1MTYzMzIwNCwiZXhwIjoxNTUxNjM2ODA0fQ.NfAzUpmdNNskhEcXSWBAostvDT424sJUMgu358NwFjQ')
        return Observable.of(true).delay(1000);

        // return this.http.post('login', {username: username, password: password})
        //     .pipe(
        //         map((data: any) => {
        //             AuthenticationService.setToken(data.token);
        //             return data;
        //         })
        //     )
    }

    getAdminUser() {
        return Observable.of('Hello Alligator!').delay(1000);
        // return this.http.get<any>('adminUser').pipe(map(data => {
        //
        //     localStorage.setItem('user', JSON.stringify(data));
        //     return data
        // })).catch((err) => {
        //     if (err.status === 404 || err.status === 403) {
        //         this.alertService.addMessage('danger', 'user not found')
        //         this.logout();
        //     }
        //     return throwError(err)
        // });
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    isLoggedIn() {
        let token = AuthenticationService.getToken();
        if (token) {
            let payload = JSON.parse(window.atob(token.split('.')[1]));
            if (payload.exp > Date.now() / 1000){
                this.alertService.addMessage('danger', 'token expired')
                return false
            }
            return true;
        } else {
            return false
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.router.navigate(['login']);
    }
}