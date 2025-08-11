
import { Component, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Treebar } from '../../treebar/treebar';
import { PlusModalComponent } from '../../components/plus-modal/plus-modal.component';
import { PlusModalLokalComponent } from '../../components/plus-modal-lokal/plus-modal-lokal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, Treebar, PlusModalComponent, PlusModalLokalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  leftMenuOpen = false;
  rightMenuOpen = false;
  showLeftMenu = true;
  showRightMenu = true;
  selectedRoute: string = '';
  plusModalOpen = false;
  plusModalLokalOpen = false;
  get isLoginPage(): boolean {
    return this.selectedRoute === '/login';
  }
  openPlusModal() {
    this.plusModalOpen = true;
  }

  closePlusModal() {
    this.plusModalOpen = false;
  }

  openPlusModalLokal() {
    this.plusModalLokalOpen = true;
  }

  closePlusModalLokal() {
    this.plusModalLokalOpen = false;
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
    // Ensure rightMenuOpen is false if the right menu should not be shown
    if (!this.showRightMenu && this.rightMenuOpen) {
      this.rightMenuOpen = false;
    }
    // Ensure leftMenuOpen is false if the left menu should not be shown
    if (!this.showLeftMenu && this.leftMenuOpen) {
      this.leftMenuOpen = false;
    }
  }

  // Toggle left sidebar menu
  toggleLeftMenu(): void {
    this.leftMenuOpen = !this.leftMenuOpen;
    if (this.leftMenuOpen) this.rightMenuOpen = false;
  }

  // Toggle right sidebar menu
  toggleRightMenu(): void {
    this.rightMenuOpen = !this.rightMenuOpen;
    if (this.rightMenuOpen) {
      this.leftMenuOpen = false;
    }
    // If closing, ensure state is synced
    if (!this.rightMenuOpen) {
      setTimeout(() => { this.rightMenuOpen = false; }, 0);
    }
  }

  // Close both menus (called by overlay click)
  closeMenus(): void {
    this.leftMenuOpen = false;
    this.rightMenuOpen = false;
  }

  // Handle login/logout
  loginHandler(): void {
    this.cookieService.delete('secret');
    window.location.href = '/login';
  }

  // Check if a route is active
  isActive(path: string, exact = false): boolean {
    if (exact) {
      return this.selectedRoute === path;
    }
    return this.selectedRoute.startsWith(path);
  }
}