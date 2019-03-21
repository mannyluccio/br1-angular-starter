import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {HotelComponent} from "./hotel.component";


const routes: Routes = [
    { path: "", component: HotelComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class HotelRoutingModule { }

