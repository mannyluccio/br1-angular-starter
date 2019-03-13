import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent{

    private data: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.data = this.route.snapshot.data;
    }

}