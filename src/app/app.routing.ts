import { Routes, RouterModule } from '@angular/router';
import {LoginGuardService as LoginGuard} from "../services/login-guard.service";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService as AuthGuard} from "../services/auth-guard.service";
import {HomeComponent} from "./home/home.component";
import {AuthResolver} from "../services/auth.resolver";
import {RedeemComponent} from "./redeem/redeem.component";
import {SettingsComponent} from "./settings/settings.component";
import {BooksComponent} from "./books/books.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: {
            admin: AuthResolver
        },
        children: [
            {path: '', redirectTo: 'books', pathMatch: 'full'},
            {
                path: 'books',
                component: BooksComponent
            },
            {
                path: 'redeem',
                component: RedeemComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    }
];

export const routing = RouterModule.forRoot(appRoutes);