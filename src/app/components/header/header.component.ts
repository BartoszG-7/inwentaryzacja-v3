import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterOutlet],
    providers: [HeaderService, HttpClient],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuValue:boolean = true;
    menu_icon: string = 'bi bi-list';

    openMenu() {
        this.menuValue = !this.menuValue;
        this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
    }


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