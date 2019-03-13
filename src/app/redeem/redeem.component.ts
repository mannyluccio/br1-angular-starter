import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: 'redeem.component.html'
})

export class RedeemComponent{

    private data: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.data = this.route.snapshot.data;
    }

}