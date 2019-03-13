import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: 'books.component.html'
})

export class BooksComponent{

    private data: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.data = this.route.snapshot.data;
    }

}