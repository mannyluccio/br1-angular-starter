
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {HotelComponent} from "./hotel.component";
import {HotelRoutingModule} from "./hotel.routing";

@NgModule({
    imports: [CommonModule, HotelRoutingModule],
    declarations: [HotelComponent]
})
export class HotelModule {}
