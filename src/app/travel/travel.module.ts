
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {TravelComponent} from "./travel.component";
import {TravelRoutingModule} from "./travel.routing";

@NgModule({
    imports: [CommonModule, TravelRoutingModule],
    declarations: [TravelComponent]
})
export class TravelModule {}
