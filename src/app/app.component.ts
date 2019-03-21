import { Component } from '@angular/core';
import '../assets/scss/main.scss'
import {ViewEncapsulation} from '@angular/core';
import 'bootstrap';
import {AuthenticationService} from "../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";

let currentStyle = require('./app.component.scss').toString();

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [currentStyle],
    encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

    constructor(
        private translate: TranslateService,
        private authService: AuthenticationService,
    ) {
        translate.setDefaultLang('en');
    }

    switchLanguage(language: string) {
        console.log(language)
        this.translate.use(language);
    }

    logout(){
        this.authService.logout();
    }

}
