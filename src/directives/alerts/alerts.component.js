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
var alerts_service_1 = require("./alerts.service");
var $ = require("jquery");
var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
        this.close = function (currentAlert) {
            $(currentAlert).alert('close');
        };
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (alert) {
            var currentAlert = $("<div class=\"alert alert-" + alert.type + " alert-dismissible fade\" role=\"alert\">" + alert.message + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>");
            // $(currentAlert).find('a').bind('click', () => {
            //     $(currentAlert).alert('close')
            // });
            $(_this.el.nativeElement).append(currentAlert);
            setTimeout(function () {
                currentAlert.addClass("show");
            });
            setTimeout(function () { $(currentAlert).alert('close'); }, 2000);
        });
    };
    __decorate([
        core_1.ViewChild('alertContainer'),
        __metadata("design:type", core_1.ElementRef)
    ], AlertComponent.prototype, "el", void 0);
    AlertComponent = __decorate([
        core_1.Component({
            selector: 'alert',
            templateUrl: 'alerts.component.html'
        }),
        __metadata("design:paramtypes", [alerts_service_1.AlertService])
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alerts.component.js.map