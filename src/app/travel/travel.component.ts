import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";

let currentStyle = require('./travel.component.scss').toString();

@Component({
    selector: 'travel-component',
    templateUrl: './travel.component.html',
    styleUrls: [currentStyle],
    encapsulation: ViewEncapsulation.Emulated
})
export class TravelComponent implements OnDestroy{

    private subscription = new Subscription();

    constructor( private authenticationService: AuthenticationService) {
       console.log('travel')
        let sub = this.authenticationService.getAdminUser()
            .subscribe(
                data => {
                    console.log(data)
                },
                error => {
                    console.log(error)
                });
        this.subscription.add(sub);
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
// private model: any = {};
// private subscription = new Subscription();
// private loading: boolean = false;
//
// constructor(
//     private authenticationService: AuthenticationService,
//     private router: Router
// ) {}
//
// login() {
//     this.loading = true;
//     let sub = this.authenticationService.login(this.model.email, this.model.password)
//         .subscribe(
//             data => {
//                 this.router.navigate(['/']);
//             },
//             error => {
//                 this.loading = false;
//                 throw error;
//             });
//     this.subscription.add(sub);
// }
//
// ngOnDestroy(): void {
//     this.subscription.unsubscribe();
// }
