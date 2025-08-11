import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    providers: [CookieService],
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class App {
    constructor(private cookieService: CookieService, private router: Router) { }
    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && event.url !== '/login' && this.cookieService.get('secret') !== "d07f690d14a52002aa869e7b7e428bc79d49466141b85952a69009e36d8ef701") {
                this.router.navigate(['/login']);

            }
        });

    }
}