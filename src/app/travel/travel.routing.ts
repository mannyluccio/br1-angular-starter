import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {TravelComponent} from "./travel.component";


const routes: Routes = [
    { path: "", component: TravelComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class TravelRoutingModule { }

