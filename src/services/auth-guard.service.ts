import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        public auth: AuthenticationService,
        public router: Router) {}

    canActivate(): boolean {
        if (!this.auth.isLoggedIn()) {
            this.auth.logout();
            console.log('logout')
            return false;
        }
        return true;
    }
}