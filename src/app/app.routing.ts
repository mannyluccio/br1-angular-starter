import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "travel"
    },
    {
        path: "travel",
        loadChildren: "./travel/travel.module#TravelModule"
    },
    {
        path: "hotel",
        loadChildren: "./hotel/hotel.module#HotelModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}

