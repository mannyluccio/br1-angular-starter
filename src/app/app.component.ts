import { Component } from '@angular/core';
import '../assets/scss/main.scss'
import {ViewEncapsulation} from '@angular/core';
import 'bootstrap';
import {TranslateService} from "../services/translate.service";
import {AuthenticationService} from "../services/authentication.service";

let currentStyle = require('./app.component.scss').toString();

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [currentStyle],
    encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

    private lang: string = 'en';

    constructor(
        private translate: TranslateService,
        private authService: AuthenticationService,
    ) {
    }

    setLang(lang: string) {
        this.translate.use(lang);
        this.lang = lang;
    }

    logout(){
        this.authService.logout();
    }

}
