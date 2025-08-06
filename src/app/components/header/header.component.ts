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

    get isLoginPage(): boolean {
        return this.selectedRoute === '/login';
    }

    get isMobile(): boolean {
        return window.innerWidth <= 768;
    }

    get isLoggedIn(): boolean {
        return this.cookieService.check('secret');
    }

    constructor(private router: Router, private cookieService: CookieService) {
        this.selectedRoute = router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.selectedRoute = event.urlAfterRedirects;
                this.updateMenus();
            }
        });
        this.updateMenus();
        window.addEventListener('resize', () => this.updateMenus());
    }

    updateMenus() {
        if (!this.isLoggedIn) {
            this.showLeftMenu = false;
            this.showRightMenu = false;
        } else if (this.selectedRoute === '/home') {
            this.showLeftMenu = true;
            this.showRightMenu = false;
        } else if (this.isMobile) {
            this.showLeftMenu = true;
            this.showRightMenu = true;
        } else {
            this.showLeftMenu = true;
            this.showRightMenu = true;
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