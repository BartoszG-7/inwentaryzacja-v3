import { Component, ComponentRef } from '@angular/core';
import { HeaderArrowService } from './header-arrow.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Treebar } from '../../treebar/treebar';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { PlusModalComponent } from '../../components/plus-modal/plus-modal.component';
import { PlusModalLokalComponent } from '../../components/plus-modal-lokal/plus-modal-lokal.component';
import { SearchBarMobileComponent } from '../search-bar-mobile/search-bar-mobile.component';
import { GlobalSearchModalComponent } from '../../components/global-search-modal/global-search-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Treebar,
    PlusModalComponent,
    PlusModalLokalComponent,
  SearchBarMobileComponent,
  GlobalSearchModalComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showBackArrow = false;
  searchInput: string = '';
  onSearch(event: string): void {
    this.searchInput = event;

    // Here you can implement the logic to handle the search input
    // For example, you might want to filter the locations based on the search term
  }
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

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private arrowService: HeaderArrowService
    , private treebarSharedService: TreebarSharedService
  ) {
    this.arrowService.showArrow$.subscribe((show) => {
      this.showBackArrow = show;
    });
    // keep track of last treebar selection so back arrow can return to the exact project/location
    this.treebarSharedService.getData().subscribe({
      next: (d) => {
        this._lastTreebarData = d;
        // remember the last full parsed location object so we can restore it when returning from a project
        if (d && d.location && d.projects !== undefined) {
          this._lastLocationData = d;
        }
      },
    });
    this.selectedRoute = this.router.url;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.selectedRoute = event.urlAfterRedirects;
        this.updateMenus();
        // Hide arrow if not on lokalizacje route
        if (!this.selectedRoute.startsWith('/lokalizacje')) {
          this.arrowService.setShowArrow(false);
        }
      }
    });
    this.updateMenus();
    window.addEventListener('resize', () => this.updateMenus());
  }

  private _lastTreebarData: any;
  private _lastLocationData: any;

  goToInwentaryzacja() {
    // If we have a recent project or location, navigate specifically back to it (SPA) and push selection to shared service
    try {
      if (this._lastTreebarData) {
        if (this._lastTreebarData.type === 'project') {
          const id = this._lastTreebarData.projectId || this._lastTreebarData.id;
          // If we have a stored full location object, navigate back to that location and restore it
          if (this._lastLocationData) {
            const locId = this._lastLocationData.location._id;
            this.router.navigate(['/inwentaryzacja/' + JSON.stringify({ type: 'location', id: locId })]);
            this.emitAfterNavigation(this._lastLocationData);
            return;
          }
          // fallback: navigate to project route and emit project selection
          this.router.navigate(['/inwentaryzacja/' + JSON.stringify({ type: 'project', id: id })]);
          this.emitAfterNavigation({ type: 'project', projectId: id });
          return;
        }
        if (this._lastTreebarData.type === 'location') {
          const locId = this._lastTreebarData.location?._id || this._lastTreebarData.locationId || this._lastTreebarData.id;
          this.router.navigate(['/inwentaryzacja/' + JSON.stringify({ type: 'location', id: locId })]);
          this.emitAfterNavigation(
            this._lastTreebarData && this._lastTreebarData.location && this._lastTreebarData.projects !== undefined
              ? this._lastTreebarData
              : { type: 'location', location: { _id: locId } }
          );
          return;
        }
      }
    } catch (err) {
      // fallback to default
    }
    this.router.navigate(['/inwentaryzacja/{}']);
    this.emitAfterNavigation({});
  }

  // Emit shared data after the router finishes navigating to an inwentaryzacja route.
  // Uses a short-lived subscription to NavigationEnd to avoid timing races.
  private emitAfterNavigation(data: any) {
    const sub = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd && evt.urlAfterRedirects && evt.urlAfterRedirects.startsWith('/inwentaryzacja')) {
        this.treebarSharedService.setData(data);
        sub.unsubscribe();
      }
    });
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
      setTimeout(() => {
        this.rightMenuOpen = false;
      }, 0);
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
