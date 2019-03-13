import {Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
const $ = require("jquery");

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
})

export class ModalComponent{

    @ViewChild('myModal') myModal:ElementRef;
    @Output() closed = new EventEmitter<boolean>();

    constructor() {}

    show(optClass?){
        //open modal using jQuery
        (<any>$(this.myModal.nativeElement)).children().addClass(optClass ? optClass : '').end().modal(
            {
                backdrop: 'static',
                keyboard: false
            }
        );
    }

    isVisible(): boolean{
        return (<any>$(this.myModal.nativeElement)).hasClass('show');
    }

    dismiss(){
        //close modal using jQuery
        (<any>$(this.myModal.nativeElement)).modal('hide');
        this.closed.emit();
    }

}