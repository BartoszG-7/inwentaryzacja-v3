import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home-only/home.component';
import { LokalizacjeComponent } from './lokalizacje/lokalizacje.component';
import { MagazynMainComponent } from './magazyn/magazyn-main/magazyn-main.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inwentaryzacja', component: LokalizacjeComponent },
    { path: 'magazyn', component: MagazynMainComponent },
];