import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  providers: [CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) { }
  ngOnInit(): void {
    if (this.cookieService.get('secret') === 'd07f690d14a52002aa869e7b7e428bc79d49466141b85952a69009e36d8ef701') {
      this.router.navigate(['/home']);
    }
  }
  login(username: string, password: string): void {
    if (username === 'admin' && password === 'admin') {
      this.cookieService.set('secret', 'd07f690d14a52002aa869e7b7e428bc79d49466141b85952a69009e36d8ef701');
      this.router.navigate(['/home']);
    }
  }
}
