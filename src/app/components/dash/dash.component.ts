import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashService } from './dash.service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'dash',
    standalone: true,
    imports: [RouterOutlet],
    providers: [DashService, HttpClient],
    templateUrl: './dash.html',
    styleUrl: './dash.scss'
})
export class Dash implements OnInit {

    constructor(private readonly dashService: DashService) { }

    ngOnInit(): void {
        this.dashService.getData().subscribe({
            next: (data) => {
                console.log('Data received:', data);
            },
            error: (error) => {
                console.error('Error fetching data:', error);
            }
        });

    }
}