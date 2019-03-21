import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AlertComponent} from "./directives/alerts/alerts.component";
import {AlertService} from "./directives/alerts/alerts.service";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {NoopInterceptor} from "./resources/http.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app/app.routing";
import {ModalComponent} from "./directives/modal/modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginGuardService} from "./services/login-guard.service";
import {AuthenticationService} from "./services/authentication.service";
import {AuthResolver} from "./services/auth.resolver";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/src/i18n/');
}

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        ModalComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
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
