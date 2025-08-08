import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { HomeLatestModifiedComponent } from '../latest-modified/home-latest-modified.component';
import { HomeStockViewComponent } from '../stock-view/home-stock-view.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }
  getData(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/data/home');
  }
}
