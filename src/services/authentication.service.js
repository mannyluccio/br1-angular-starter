"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/internal/operators");
var index_1 = require("rxjs/index");
var alerts_service_1 = require("../directives/alerts/alerts.service");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(router, http, alertService) {
        this.router = router;
        this.http = http;
        this.alertService = alertService;
    }
    AuthenticationService.prototype.login = function (username, password) {
        return this.http.post('login', { username: username, password: password })
            .pipe(operators_1.map(function (data) {
            localStorage.setItem('token', data.token);
            return data;
        }));
    };
    AuthenticationService.prototype.successCallback = function (message) {
        this.alertService.addMessage('success', message);
    };
    AuthenticationService.prototype.resetPassword = function (payload, token) {
        var _this = this;
        var headers = new http_1.HttpHeaders({
            'x-access-token': token
        });
        var url = "forgotPassword/";
        return this.http.put(url, payload, {
            headers: headers,
        }).pipe(operators_1.map(function (data) {
            _this.successCallback(data.message);
            return data;
        }));
    };
    AuthenticationService.prototype.forgotPassword = function (usermail) {
        return this.http.post('forgotPassword', { usermail: usermail })
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    AuthenticationService.prototype.getAdminUser = function () {
        // const headers = new HttpHeaders();
        // headers.append('x-access-token', localStorage.getItem('token'));
        var _this = this;
        // return this.http.get<any>('adminUser', {
        //     headers: headers
        return this.http.get('adminUser').pipe(operators_1.map(function (data) {
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        })).catch(function (err) {
            if (err.status === 404 || err.status === 403) {
                _this.alertService.addMessage('danger', 'user not found');
                _this.logout();
            }
            return index_1.throwError(err);
        });
    };
    AuthenticationService.prototype.setToken = function (token) {
        return localStorage.setItem('token', token);
    };
    AuthenticationService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthenticationService.prototype.getUser = function () {
        var user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(localStorage.getItem('user'));
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.isAllowed = function (context, action) {
        var userModules = this.getUser().modules;
        return userModules[context][action];
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        var token = this.getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.clear();
        this.router.navigate(['login']);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            http_1.HttpClient,
            alerts_service_1.AlertService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map