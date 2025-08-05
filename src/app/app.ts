import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    providers: [CookieService],
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class App {
    constructor(private cookieService: CookieService, private router: Router) { }
    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                console.log('Navigation ended:', event.url);
            }
        });

    }
}