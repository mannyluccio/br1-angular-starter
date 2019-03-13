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
var authentication_service_1 = require("./authentication.service");
var AuthResolver = /** @class */ (function () {
    function AuthResolver(authenticationService) {
        this.authenticationService = authenticationService;
    }
    AuthResolver.prototype.resolve = function (route, state) {
        if (route.queryParams.action === 'reset') {
            return true;
        }
        if (route.queryParams.token) {
            this.authenticationService.setToken(route.queryParams.token);
        }
        return this.authenticationService.getAdminUser();
    };
    AuthResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
    ], AuthResolver);
    return AuthResolver;
}());
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map