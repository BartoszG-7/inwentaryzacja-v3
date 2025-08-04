import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashService } from './dash.service';
@Component({
    selector: 'dash',
    standalone: true,
    imports: [RouterOutlet],
    providers: [DashService],
    templateUrl: './dash.html',
    styleUrl: './dash.scss'
})
export class Dash {

}