import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AlertService } from './alerts.service';
const $ = require("jquery");

@Component({
    selector: 'alert',
    templateUrl: 'alerts.component.html'
})

export class AlertComponent implements OnInit {
    @ViewChild('alertContainer') el:ElementRef;

    constructor(private alertService: AlertService) {}

    close = (currentAlert: any) => {
        $(currentAlert).alert('close')
    };

    ngOnInit() {

        this.alertService.getMessage().subscribe(alert => {
            let currentAlert = $(`<div class="alert alert-${alert.type} alert-dismissible fade" role="alert">${alert.message}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
            // $(currentAlert).find('a').bind('click', () => {
            //     $(currentAlert).alert('close')
            // });
            $(this.el.nativeElement).append(currentAlert);
            setTimeout(() => {
                currentAlert.addClass("show")
            });
            setTimeout(() => { $(currentAlert).alert('close'); }, 2000);
        });
    }
}