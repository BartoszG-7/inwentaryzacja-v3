import { Component, ComponentRef, OnInit } from '@angular/core';
import { HeaderArrowService } from './header-arrow.service';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Router,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Treebar } from '../../treebar/treebar';
import { PlusModalComponent } from '../../components/plus-modal/plus-modal.component';
import { PlusModalLokalComponent } from '../../components/plus-modal-lokal/plus-modal-lokal.component';
import { SearchBarMobileComponent } from '../search-bar-mobile/search-bar-mobile.component';
import { GlobalSearchModalComponent } from '../../components/global-search-modal/global-search-modal.component';
import { TreebarSharedService } from '../../home/treebar.share.service';
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
export class HeaderComponent implements OnInit {
  showBackArrow = false;
  searchInput: string = '';
  urlData: any;
  onSearch(event: string): void {
    this.searchInput = event;

    // Here you can implement the logic to handle the search input
    // For example, you might want to filter the locations based on the search term
  }
  ngOnInit() {
    this.treebarSharedService.getData().subscribe({
      next: (e) => {
        console.log('HEADER TRBAR SERVICE', e);
        this.rightMenuOpen = false;
      },
    });
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
    private arrowService: HeaderArrowService,
    private activeRoute: ActivatedRoute,
    private treebarSharedService: TreebarSharedService
  ) {
    this.arrowService.showArrow$.subscribe((show) => {
      this.showBackArrow = show;

      console.log('INIT');
      this.activeRoute.firstChild?.params.subscribe({
        next: (e) => {
          this.urlData = JSON.parse(e['data']);
          console.log('URLDATA', e);
        },
      });
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

  goToInwentaryzacja() {
    // this.router.navigate(['/inwentaryzacja/{}']);
    //route to page without selected project or location and hard reload (copilot dont break it)

    console.log('BUTTON DATA');
    if (this.urlData.idLoc != undefined) {
      this.router
        .navigate(['/inwentaryzacja/'])

        .then(() => {
          window.location.reload();
        });
    } else {
      this.router.navigate(['/inwentaryzacja']).then(() => {
        window.location.reload();
      });
    }
    // this.router.navigate(['/inwentaryzacja/{}']).then(() => {
    //   window.location.reload();
    // });
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
