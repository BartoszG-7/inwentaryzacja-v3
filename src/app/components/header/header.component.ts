import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ RouterLink],
    providers: [HeaderService, HttpClient],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuValue:boolean = false;
    menu_icon: string = 'bi bi-list';

    openMenu() {
        this.menuValue = !this.menuValue;
        this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
    }

    closeMenu() {
        this.menuValue = false;
        this.menu_icon = 'bi bi-list';
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