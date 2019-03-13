import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: 'settings.component.html'
})

export class SettingsComponent{

    private data: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.data = this.route.snapshot.data;
    }

}