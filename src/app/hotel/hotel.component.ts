import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

let currentStyle = require('./hotel.component.scss').toString();

@Component({
    selector: 'hotel-component',
    templateUrl: './hotel.component.html',
    styleUrls: [currentStyle],
    encapsulation: ViewEncapsulation.Emulated
})
export class HotelComponent {
    constructor(
    ) {
       console.log('hotel')
    }



}
