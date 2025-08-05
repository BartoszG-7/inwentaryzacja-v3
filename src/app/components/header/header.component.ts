import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    providers: [HeaderService, HttpClient, CookieService],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private readonly cookieService: CookieService, private readonly router: Router) { }
    loginText: string = 'Login';
    ngOnInit(): void {
        if (this.cookieService.get('secret') === "d07f690d14a52002aa869e7b7e428bc79d49466141b85952a69009e36d8ef701") {
            this.loginText = 'Logout';

        } else {
            this.loginText = 'Login';
        }
    }
    menuValue: boolean = false;
    menu_icon: string = 'bi bi-list';
    loginHandler() {
        this.closeMenu();
        if (this.cookieService.get('secret') === "d07f690d14a52002aa869e7b7e428bc79d49466141b85952a69009e36d8ef701") {
            this.cookieService.delete('secret');
            this.loginText = 'Login';
            this.router.navigate(['/login']);
        }
    }
    openMenu() {
        this.menuValue = !this.menuValue;
        this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
    }

    closeMenu() {
        this.menuValue = false;
        this.menu_icon = 'bi bi-list';
    }




}