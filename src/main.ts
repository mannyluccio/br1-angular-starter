import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AlertComponent} from "./directives/alerts/alerts.component";
import {AlertService} from "./directives/alerts/alerts.service";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NoopInterceptor} from "./resources/http.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {routing} from "./app/app.routing";
import {HomeComponent} from "./app/home/home.component";
import {LoginComponent} from "./app/login/login.component";
import {ModalComponent} from "./directives/modal/modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginGuardService} from "./services/login-guard.service";
import {AuthenticationService} from "./services/authentication.service";
import {AuthResolver} from "./services/auth.resolver";
import {TranslateService} from "./services/translate.service";
import {TranslatePipe} from "./pipes/translate.pipe";
import {RedeemComponent} from "./app/redeem/redeem.component";
import {SettingsComponent} from "./app/settings/settings.component";
import {BooksComponent} from "./app/books/books.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

export function setupTranslateFactory(
    service: TranslateService): Function {
    return () => service.use('en');
}

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        RedeemComponent,
        SettingsComponent,
        BooksComponent,
        LoginComponent,
        ModalComponent,
        TranslatePipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        TranslateService,
        {
            provide: APP_INITIALIZER,
            useFactory: setupTranslateFactory,
            deps: [ TranslateService ],
            multi: true
        },
        AlertService,
        AuthenticationService,
        AuthResolver,
        AuthGuardService,
        LoginGuardService
    ],
    bootstrap: [ AppComponent ]
})
export class MainModule { }
platformBrowserDynamic().bootstrapModule(MainModule);
