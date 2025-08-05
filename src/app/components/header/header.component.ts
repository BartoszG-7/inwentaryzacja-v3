import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    leftMenuOpen = false;
    rightMenuOpen = false;
    showLeftMenu = true;
    showRightMenu = true;
    selectedRoute: string = '';

    constructor(private router: Router, private cookieService: CookieService) {
        this.selectedRoute = router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.selectedRoute = event.urlAfterRedirects;
            }
        });
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

    loginHandler() {
        this.cookieService.delete('secret');
        this.router.navigate(['/login']);
    }

    isActive(path: string, exact = false): boolean {
        if (exact) {
            return this.selectedRoute === path;
        }
        return this.selectedRoute.startsWith(path);
    }
}