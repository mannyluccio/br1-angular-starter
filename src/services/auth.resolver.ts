import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthenticationService} from "./authentication.service";
import {AdminUser} from "../interfaces/admim-user.interface";

@Injectable()
export class AuthResolver implements Resolve<AdminUser> {
    constructor(
        private authenticationService: AuthenticationService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.authenticationService.getAdminUser()
    }
}