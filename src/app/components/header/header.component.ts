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

    leftMenuOpen = false;
    rightMenuOpen = false;
    loginText: string = 'Login';
    menu_icon = 'fa fa-bars';

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