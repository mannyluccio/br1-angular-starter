import {Component, OnDestroy} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
let currentStyle = require('./login.component.scss').toString();

@Component({
    templateUrl: 'login.component.html',
    styleUrls: [currentStyle]
})

export class LoginComponent implements OnDestroy {

    private model: any = {};
    private subscription = new Subscription();
    private loading: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    login() {
        this.loading = true;
        let sub = this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = false;
                    throw error;
                });
        this.subscription.add(sub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}