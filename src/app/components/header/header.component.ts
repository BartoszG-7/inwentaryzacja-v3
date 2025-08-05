import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    providers: [HeaderService, HttpClient, CookieService],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    leftMenuOpen = false;
    rightMenuOpen = false;
    loginText: string = 'Login';

    showLeftMenu = true;
    showRightMenu = false;

    constructor(
        private readonly cookieService: CookieService,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        if (this.cookieService.get('secret') === "d07f690d14a52002aa869e7b7e428bc79d49466141b85952a69009e36d8ef701") {
            this.loginText = 'Logout';
        } else {
            this.loginText = 'Login';
        }

        // Initial check for menu icons on first load
        this.updateMenuIcons(this.router.url);

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.updateMenuIcons(event.urlAfterRedirects || event.url);
            }
        });
    }

    updateMenuIcons(url: string) {
        // Left icon: mobile only, not on login
        this.showLeftMenu = !url.startsWith('/login');
        // Right icon: mobile only, only on /storage or /locations
        this.showRightMenu = url.startsWith('/storage') || url.startsWith('/locations');
    }

    loginHandler() {
        this.closeMenus();
        if (this.cookieService.get('secret') === "d07f690d14a52002aa869e7b7e428bc79d49466141b85952a69009e36d8ef701") {
            this.cookieService.delete('secret');
            this.loginText = 'Login';
            this.router.navigate(['/login']);
        }
    }

    toggleLeftMenu() {
        this.leftMenuOpen = !this.leftMenuOpen;
        if (this.leftMenuOpen) this.rightMenuOpen = false;
    }

    toggleRightMenu() {
        this.rightMenuOpen = !this.rightMenuOpen;
        if (this.rightMenuOpen) this.leftMenuOpen = false;
    }

    closeMenus() {
        this.leftMenuOpen = false;
        this.rightMenuOpen = false;
    }
}