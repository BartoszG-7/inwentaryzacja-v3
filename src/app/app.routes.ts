import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LokalizacjeComponent } from './lokalizacje/lokalizacje.component';
import { MagazynComponent } from './magazyn/magazyn.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lokalizacje', component: LokalizacjeComponent},
    { path: 'magazyn', component: MagazynComponent},
];