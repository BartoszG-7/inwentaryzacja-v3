import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'header',
    standalone: true,
    imports: [RouterOutlet],
    providers: [HeaderService, HttpClient],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class Header implements OnInit {

    constructor(private readonly HeaderService: HeaderService) { }

    ngOnInit(): void {
        this.HeaderService.getData().subscribe({
            next: (data) => {
                console.log('Data received:', data);
            },
            error: (error) => {
                console.error('Error fetching data:', error);
            }
        });

    }
}